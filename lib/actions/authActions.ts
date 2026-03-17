"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import type { signupErrorMessage } from "@/lib/definitions";
import { SignupFormSchema, SigninFormSchema } from "@/lib/definitions";
import { createNewUser } from "@/lib/queryDB";
import bcrypt from "bcrypt";

export async function signup(
  prevState: signupErrorMessage | undefined,
  formData: FormData,
) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    const errorObj = z.treeifyError(validatedFields.error);
    const nameError = errorObj.properties?.name?.errors?.[0];
    const emailError = errorObj.properties?.email?.errors?.[0];
    const passwordError = errorObj.properties?.password?.errors?.[0];

    return {
      nameMessage: nameError,
      emailMessage: emailError,
      passwordMessage: passwordError,
    };
  }
  if (validatedFields.data) {
    const data = validatedFields.data;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    let newUser;
    try {
      newUser = await createNewUser({ ...data, password: hashedPassword });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return { emailMessage: "Email already registered" };
      }
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });
  }
}
export async function authenticateUserWithCredencials(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  // Valide signin fields fromData

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      message: "Invalid credentials.",
      //errors: z.treeifyError(validatedFields.error),
    };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    if (error instanceof AuthError) {
      return { message: "Invalid credentials." };
    }
  }
}

export const authenticateUserWithGitHub = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  await signIn("github", { redirectTo: "/dashboard" });
  return "ok";
};

export const signOutCallBack = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  await signOut({
    redirectTo: "/login",
  });
  return "ok";
};

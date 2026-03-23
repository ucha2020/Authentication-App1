"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import type { signupErrorMessage } from "@/lib/definitions";
import { SignupFormSchema, SigninFormSchema } from "@/lib/definitions";
import { createNewUser, upgradeUser } from "@/lib/queryDB";
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return { emailMessage: "Email already registered" };
            break;
          case "P1001":
          case "P1002":
            return {
              message: " Database server is unavailable. Try again later.",
            };
          default:
            throw new Error("An unexpected error occurred. Try again later.");
        }
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new Error("Database connection error");
      } else {
        throw error;
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
    } else {
      throw error;
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

export async function upgradeUserToAdmin(
  prevState: string | undefined,
  formData: FormData,
) {
  const userEmail = formData.get("userEmail") as string;

  try {
    await upgradeUser(userEmail);
  } catch (error) {
    return "Failed to upgrade user. Try again later.";
  }

  await signIn("credentials", {
    email: userEmail,
    redirect: false,
    fromUpgrade: true,
  });

  revalidatePath("/dashboard/admin");
  redirect("/dashboard/admin");
}

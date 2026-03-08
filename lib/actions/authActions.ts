"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

import {
  SignupFormSchema,
  FormState,
  SigninFormSchema,
} from "@/lib/definitions";
import { createNewUser } from "@/lib/queryDB";
import bcrypt from "bcrypt";

export async function signup(prevState: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      message: "xxxxxx",
      //errors: z.treeifyError(validatedFields.error),
    };
  }
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
      return { message: "Email already registered" };
    }
    return { message: "Something went wrong." };
  }
  const r = "o";

  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirectTo: "/dashboard",
  });
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
      message: "xxxxxx",
      //errors: z.treeifyError(validatedFields.error),
    };
  }

  await signIn("credentials", formData);
}

export const authenticateUserWithGitHub = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  await signIn("github", { redirectTo: "/dashboard" });
  return "ok";
};

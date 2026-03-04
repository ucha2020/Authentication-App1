"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { credentialsSchema } from "@/lib/zod";
import type { CreateUserState } from "@/app/typeShapes";
import { createNewUser } from "@/lib/queryDB";
import bcrypt from "bcryptjs";

export async function createUser(
  prevState: string | undefined,
  formData: FormData,
) {
  const scannedCredentials = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const data = scannedCredentials.data;
  const success = scannedCredentials.success;
  const error = scannedCredentials.error;

  if (!success) {
    return "Something went wrong.";
  }

  //const hashedPassword = (await data) && bcrypt.hash(data.password, 10);
  let newUser;
  try {
    if (data) {
      newUser = await createNewUser(data);
    }
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return "Email already registered";
    }
    return "Something went wrong.";
  }

  try {
    await signIn("credentials", {
      email: newUser?.email,
      password: newUser?.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function authenticateUserWithCredencials(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const authenticateUserWithGitHub = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn("github", { redirectTo: "/dashboard" });
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      return "Something went wrong.";
      //return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }

    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error;
  }
};

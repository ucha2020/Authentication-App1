import type { NextAuthConfig } from "next-auth";
import { ZodError } from "zod";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { fetchUserWithUniqueEmail } from "@/lib/queryDB";
import { SignupFormSchema } from "./lib/definitions";
import bcrypt from "bcrypt";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        type: "email",
        label: "Email",
        placeholder: "muka@gmail.com",
      },
      password: {
        type: "password",
        label: "Password",
        placeholder: "*****",
      },
    },
    authorize: async (credentials) => {
      //This function is called when the signIn button is clicked
      const { email, password } = credentials as {
        email: string;
        password: string;
      };
      let user;
      try {
        user = await fetchUserWithUniqueEmail(email);
      } catch {
        //To be added later
        //maybe an erroy page
      }

      if (!user) {
        // No user found
        throw new Error("Invalid credentials.");
      }

      const isValid = await bcrypt.compare(password, user.password as string);

      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      // return user object with their profile data
      return user;
    },
  }),
  GitHub,
];
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to signin page (login page)
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers,
} satisfies NextAuthConfig;

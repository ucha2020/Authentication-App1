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
      const { email, password, fromUpgrade } = credentials as {
        email: string;
        password: string;
        fromUpgrade: boolean;
      };

      const user = await fetchUserWithUniqueEmail(email);

      if (!user) {
        // No user found
        throw new Error("Invalid credentials.");
      }

      if (!fromUpgrade) {
        const isValid = await bcrypt.compare(password, user.password as string);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.role === "string") {
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers,
} satisfies NextAuthConfig;

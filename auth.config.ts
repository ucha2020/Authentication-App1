import type { NextAuthConfig } from "next-auth";
import { ZodError } from "zod";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { credentialsSchema } from "@/lib/zod";
import { fetchUserWithUniqueEmail } from "@/lib/queryDB";
import bcrypt from "bcryptjs";

const providers: Provider[] = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
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
      try {
        let user = null;

        // signIn details is valideted using zod
        /*const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }*/
        const { email, password } =
          await credentialsSchema.parseAsync(credentials);

        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password);
        //const pwHash = password;

        // logic to verify if the user exists
        //user = await getUserFromDb(email, pwHash);
        user = await fetchUserWithUniqueEmail(email);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      } catch (error) {
        if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
        return null;
      }
    },
  }),
  GitHub,
];
export const authConfig = {
  /*pages: {
    signIn: "/login",
  },*/
  session: {
    strategy: "database",
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

    /*
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        return token;
      }

      return token;
    },
    */
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //session.accessToken = token.accessToken
      //session.user.id = token.id
      session.user.id = user?.id;

      return session;
    },
  },
  providers,
} satisfies NextAuthConfig;

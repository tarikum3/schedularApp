import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";

import { authConfig } from "./auth.config";
import { login, logout, getCustomer, signup } from "@lib/services";
async function getUser(
  email: string,
  password: string
): Promise<any | undefined> {
  try {
    const data = await login({ email, password });
    const token = data?.customerAccessToken?.accessToken;
    if (token) {
      const user = await getCustomer(token);
      return { ...user, token };
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email, password);
          if (!user) return null;

          return user;
        }

        // console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to home page
      }
      //  else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", nextUrl));
      // }
      return true;
    },
    async jwt({ token, user, session }) {
      // the processing of JWT occurs before handling sessions.
      // console.log("jwt callback ", { token, user, session });

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.phone = user.phone;
        token.email = user.email;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.firstName;
      }

      return token;
    },

    //  The session receives the token from JWT
    async session({ session, token, user }) {
      //  console.log("session callback ", { token, user, session });

      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,

          id: token.id as string,
          phone: token.phone as string,
          email: token.email as string,

          firstName: token.firstName as string,
          lastName: token.lastName as string,
        },
        error: token.error,
      };
    },
  },
});

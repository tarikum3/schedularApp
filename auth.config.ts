import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import Nodemailer from "next-auth/providers/nodemailer";
export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("nextUrl ", nextUrl);
      const isOnAuthPage = nextUrl.pathname.startsWith("/auth");
      //if (isLoggedIn) return true;
      if (isLoggedIn) {
        if (isOnAuthPage)
          return Response.redirect(new URL("/schedular", nextUrl));

        return true;
      }
      if (isOnAuthPage) return true;

      return false; // Redirect unauthenticated users to login page

      // return true;
    },
  },
} satisfies NextAuthConfig;

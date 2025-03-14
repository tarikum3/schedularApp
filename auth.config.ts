import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import Nodemailer from "next-auth/providers/nodemailer";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page

      // return true;
    },
  },
} satisfies NextAuthConfig;

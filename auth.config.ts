import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import Nodemailer from "next-auth/providers/nodemailer";
export const authConfig = {
  pages: {
    signIn: "/",
  },
  providers: [
    //Google,
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
    //  Email,
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    // Nodemailer({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnProfile = nextUrl.pathname.startsWith("/profile");
  //     if (isOnProfile) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to home page
  //     }
  //     //  else if (isLoggedIn) {
  //     //   return Response.redirect(new URL("/dashboard", nextUrl));
  //     // }
  //     return true;
  //   },
  //   async jwt({ token, user, session }) {
  //     // the processing of JWT occurs before handling sessions.
  //     console.log("jwt callback ", { token, user, session });

  //     if (user) {
  //       token.accessToken = user.accessToken;
  //       token.refreshToken = user.refreshToken;
  //       token.accessTokenExpires = user.accessTokenExpires;
  //       token.phone = user.phone;
  //       token.email = user.email;
  //       token.id = user.id;
  //       token.firstName = user.firstName;
  //       token.lastName = user.firstName;
  //     }

  //     return token;
  //   },

  //   //  The session receives the token from JWT
  //   async session({ session, token, user }) {
  //     console.log("session callback ", { token, user, session });

  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         accessToken: token.accessToken as string,
  //         refreshToken: token.refreshToken as string,

  //         id: token.id as string,
  //       },
  //       error: token.error,
  //     };
  //   },
  // },
} satisfies NextAuthConfig;

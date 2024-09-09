import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";

import { authConfig } from "./auth.config";
//import { login, logout, getCustomer, signup } from "@lib/services";
import { getCustomer } from "@lib/services/prismaServices";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
async function getUser(
  email: string,
  password: string
): Promise<any | undefined> {
  try {
    // const data = await login({ email, password });
    // const token = data?.customerAccessToken?.accessToken;
    // if (token) {
    // const user = await getCustomer(token);
    // return { ...user, token };
    // }
    const user = await getCustomer({ email });
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }
    if (user) {
      return { ...user };
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
    Google,
    // google({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
    Credentials({
      async authorize(credentials) {
        console.log("Invalid credentialssd", credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          //  console.log("emailpassword", parsedCredentials.data);
          const user = await getUser(email, password);
          //const user = await getUser('tarikm3@gmail.com', '9427230912');
          //console.log("emailpassword", user);
          if (!user) return null;

          return user;
        }

        // console.log("Invalid credentialss", parsedCredentials);
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("isLoggedInuser", auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      //  console.log("isLoggedInuser", auth?.user);
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to home page
      }
      //  else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", nextUrl));
      // }
      return true;
    },
    async signIn({ user, account, profile }) {
      // Here you have access to the user's information
      console.log("isLoggedInuseremail", "email");
      const { name, email } = user;
      console.log("isLoggedInuseremail", email);
      if (email) {
        try {
          const isuser = await getCustomer({ email });
          // if (!isuser) {
          //   //'/login?origin=login'
          //   return "/?notRegistered=notRegistered";
          //   //return true;
          // }
          if (isuser) {
            return true;
          }
        } catch (error) {
          return "/?notRegistered=notRegistered";
          // return true;
        }
      }
      // Return true to continue with the sign-in process
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

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

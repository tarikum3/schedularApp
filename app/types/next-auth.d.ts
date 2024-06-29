//import "next-auth";
import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    phone?: string | undefined;
    email?: string | undefined;
    id: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface Session extends DefaultSession {
    user: User;
    expires: string;
    error: string;
  }
}

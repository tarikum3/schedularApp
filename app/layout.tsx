//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Layout from "@/app/components/common/Layout";

import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="en">
      <body 
      className={inter.className}
      >
   
      
      <Layout>
      {children}
          </Layout>
      </body>
    </html>
    
  );
}

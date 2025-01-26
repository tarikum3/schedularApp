import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// import Layout from "@/app/components/common/Layout";

// import { Suspense } from "react";






const inter = Inter({ subsets: ["latin"] });
const {NEXT_PUBLIC_SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: NEXT_PUBLIC_SITE_NAME!,
    template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
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

  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
   
    <html lang={locale}>
      <body 
      className={inter.className}
      >
   
   <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      {/* <Layout> */}
      {/* {children} */}
          {/* </Layout> */}
      </body>
    </html>
    
  );
}

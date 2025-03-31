import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "@components/schedular/storeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
//import theme from "@/app/theme";
import SessionWrapper from "@/app/components/schedular/components/common/SessionWrapper";
//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MuiThemeProvider from "@/app/components/schedular/components/ui/MuiThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const { NEXT_PUBLIC_SITE_NAME } = process.env;
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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider
          //  options={{ enableCssLayer: true }}
          >
            {/* <ThemeProvider theme={theme}> */}
            <StoreProvider>
              <SessionWrapper>
                <MuiThemeProvider>{children}</MuiThemeProvider>
              </SessionWrapper>
            </StoreProvider>{" "}
            {/* </ThemeProvider> */}
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

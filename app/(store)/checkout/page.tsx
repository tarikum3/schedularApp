import CheckoutWrapper from "@/app/components/checkout/CheckoutWrapper";
import { Metadata } from "next";
import { placeOrderUtil } from "@/lib/helper";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default async function Checkout() {
  await placeOrderUtil();

  return (
    <>
      <CheckoutWrapper />
    </>
  );
}

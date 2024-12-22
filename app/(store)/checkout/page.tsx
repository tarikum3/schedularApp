import CheckoutWrapper from "@/app/components/checkout/CheckoutWrapper";
import { Metadata } from "next";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
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
 // const cartId = cookies().get("cartId")?.value;

  // if (!cartId) {
  //   return notFound;
  // }

  return (
    <>
      <CheckoutWrapper />
    </>
  );
}

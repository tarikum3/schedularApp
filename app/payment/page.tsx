import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCartByIdUtil } from "@/lib/helper";
//export const runtime = "edge";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Payment",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function Payment() {
  let cart = await getCartByIdUtil();
  if (cart?.step != "payment") {
    return notFound();
  }

  cookies().delete("cartId");
  return (
    <div className="m-10">
      <p className="capitalize text-5xl text-primary-900 text-center font-bold mb-12">
        "this feature not available"
      </p>
    </div>
  );
}

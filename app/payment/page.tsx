import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCartByIdUtil ,deleteCookies} from "@/lib/helper";
//export const runtime = "edge";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
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
  await deleteCookies("cartId");
 // cookies().delete("cartId");
  return (
    <div className="m-10">
      <p className="capitalize text-5xl text-primary-900 text-center font-bold mb-12">
        "this feature not available"
      </p>
    </div>
  );
}

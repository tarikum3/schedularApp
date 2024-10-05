import { cookies } from "next/headers";
import CartView from "./CartView";
//import { getCart } from "@lib/services";
import { getCart } from "@lib/services/prismaServices";
import { unstable_cache } from "next/cache";
import { TAGS } from "@lib/const";
import { getCartByIdUtil } from "@/lib/helper";

export default async function CartWrapper() {
  let cart = await getCartByIdUtil();
  return <CartView cart={cart as any} />;
}

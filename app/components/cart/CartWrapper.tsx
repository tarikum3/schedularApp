import CartView from "./CartView";

import { getCartByIdUtil } from "@/lib/helper";

export default async function CartWrapper() {
  let cart = await getCartByIdUtil();
  return <CartView cart={cart as any} />;
}

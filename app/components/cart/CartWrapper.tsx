import { cookies } from "next/headers";
import CartView from "./CartView";
//import { getCart } from "@lib/services";
import { getCart } from "@lib/services/prismaServices";
import { unstable_cache } from "next/cache";
import { TAGS } from "@lib/const";
const getCartItem = unstable_cache(
  async (id) => {
    const cart = await getCart(id);
    return cart;
  },
  [],
  {
    //  revalidate: 60, // Cache for 60 seconds
    tags: [TAGS.cart],
  }
);
export default async function CartWrapper() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  // if (cartId) {
  //   cart = await getCartItem(cartId);
  // }

  return <CartView cart={cart as any} />;
}

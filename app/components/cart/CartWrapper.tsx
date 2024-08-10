import { cookies } from "next/headers";
import CartView from "./CartView";
//import { getCart } from "@lib/services";
import { getCart } from "@lib/services/prismaServices";
import { unstable_cache } from "next/cache";
import { TAGS } from "@lib/const";
const getCartItem = unstable_cache(
  async (id) => {
    const cart = await getCart(id);
    const subtotalPrice = cart.items.reduce((total, item) => {
      return (total += item.variant.price);
    }, 0);
    const totalPrice = subtotalPrice + (subtotalPrice * 15) / 100;
    // cart={...cartFound,subtotalPrice:};
    return { ...cart, subtotalPrice, totalPrice, currency: "ETB" };
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

  if (cartId) {
    cart = await getCartItem(cartId);
  }

  return <CartView cart={cart as any} />;
}

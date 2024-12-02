//import CartView from "./CartView";
import CartButton from "@/app/components/cart/CartButton"
import { getCartByIdUtil } from "@/lib/helper";

export default async function CartWrapper() {
  let cart = await getCartByIdUtil();
   return <CartButton cart={cart as any} />;
  // return <CartView cart={cart as any} />;
}

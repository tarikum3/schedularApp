"use client";
import { FC, useState } from "react";
import CartItem from "./CartItem";
import { Bag } from "@/app/components/icons";
import usePrice from "@/lib/use-price";
import type { Cart } from "@lib/types";
import Clickoutside from "@/app/components/common/Clickoutside";
import { useSession } from "next-auth/react";
import { useUI } from "@/app/components/context";
import Link from "next/link";
const CartView = ({ cart }: { cart: Cart | undefined }) => {
  console.log("cartcart", cart);
  const { openModal } = useUI();
  const { data: session, status } = useSession();
  const [display, setDisplay] = useState(true);
  const [dropdown, setDropdown] = useState("");
  const { price: subTotal } = usePrice(
    cart && {
      amount: Number(cart.subtotalPrice),
      // currencyCode: cart.currency.code,
      currencyCode: (cart as any).currency,
    }
  );
  const { price: total } = usePrice(
    cart && {
      amount: Number(cart.totalPrice),
      // currencyCode: cart.currency.code,
      currencyCode: (cart as any).currency,
    }
  );
  const handleDropdown = (current: string = "") => {
    if (dropdown == current) {
      setDropdown("");
    } else {
      setDropdown(current);
      setDisplay(true);
    }
  };
  console.log("subTotal", subTotal);
  return (
    <div className="relative ">
      <button
        onClick={() => {
          handleDropdown("");

          session?.user ? handleDropdown("cart") : openModal();
        }}
        aria-label="Menu"
      >
        <Bag className="w-7 h-7" />
        {/* {session?.user && cart && cart?.lineItems?.length > 0 && ( */}
        {session?.user && cart && (cart as any)?.items?.length > 0 && (
          <span className="min-w-[1.25rem] min-h-[1.25rem] border border-primary-2 bg-secondary text-primary absolute rounded-full right-3 top-3 font-bold text-xs">
            {(cart as any)?.items?.length}
          </span>
        )}
      </button>

      {dropdown == "cart" && (
        <Clickoutside status={display} onClick={() => setDisplay(false)}>
          <div className=" absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
            <div className="absolute right-0 w-[80vw] md:w-[700px] h-screen bg-white rounded-md shadow-lg">
              {!cart || (cart as any)?.items?.length < 1 ? (
                <div className=" px-4 flex flex-col justify-center items-center h-full">
                  {/* <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
                    <Bag />
                  </span> */}
                  <h2 className="pt-6 text-3xl font-bold tracking-wide text-center">
                    Your cart is empty
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col m-5 p-3  ">
                  <div className=" ">
                    <h2 className="text-4xl font-bold tracking-wide">
                      My Cart
                    </h2>

                    <ul className="py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-primary-2 border-primary-2">
                      {(cart as any)?.items?.map((item: any) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          // currencyCode={cart!.currency.code}
                          currencyCode={cart!.currency as any}
                        />
                      ))}
                    </ul>
                  </div>

                  <div className=" px-6 py-6 sm:px-6  z-20 bottom-0 w-full bg-primary border-t text-lg">
                    <ul className="pb-2">
                      <li className="flex justify-between py-1">
                        <span>Subtotal</span>
                        <span>{subTotal}</span>
                      </li>
                      <li className="flex justify-between py-1">
                        <span>Taxes</span>
                        {/* <span>Calculated at checkout</span> */}
                        <span>15%</span>
                      </li>
                      {/* { (cart as any)?.deliveryMethod  && ( <li className="flex justify-between py-1">
                        <span>Shipping</span>
                        <span className="font-bold tracking-wide">FREE</span>
                      </li>)} */}
                    </ul>
                    <div className="flex justify-between border-t border-primary-2 py-3 font-bold mb-2">
                      <span>Total</span>
                      <span>{total}</span>
                    </div>
                    <div>
                      {/* <a
                        className="bg-secondary rounded-md inline-flex items-center justify-center w-full  text-primary p-5 text-sm"
                       
                        onClick={() => router.push("/checkout")}
                      >
                        Proceed to Checkout
                      </a> */}
                      <Link
                        href={"/checkout"}
                        // className={s.link}
                        onClick={() => {
                          handleDropdown("");
                        }}
                        className="bg-secondary rounded-md inline-flex items-center justify-center w-full  text-primary p-5 text-sm"
                      >
                        {" Proceed to Checkout"}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Clickoutside>
      )}
    </div>
  );
};

export default CartView;

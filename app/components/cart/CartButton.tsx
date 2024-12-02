"use client";
import { useState } from "react";

import { Bag } from "@/app/components/icons";
import dynamic from "next/dynamic";
import type { Cart } from "@lib/types";


const Loading = () => (
    <Bag className="w-6 h-6">
     
    </Bag>
  );
  
  const dynamicProps = {
    loading: Loading,
  };
const CartView = dynamic(() => import("@/app/components/cart/CartView"), {
    ...dynamicProps,
    ssr: false,
  });
  
  const CartUI: React. FC<{cart?:Cart}> = ({cart}) => {
    
    // return cart ? (
    //     <CartView cart={cart as any} />
    // ) : null;
    return  (
        <CartView cart={cart as any} />
    ) 
  };

const CartButton = ({ cart }: { cart: Cart | undefined }) => {
  
 
 
  const [dropdown, setDropdown] = useState("");



  const handleDropdown = (current: string = "") => {
    setDropdown(dropdown === current ? "" : current);
   
  };
  console.log("cartt",cart);
  return (
    <div className="relative">
      <button
        onClick={() => {
          // session?.user ? handleDropdown("cart") : openModal();
          handleDropdown("cart");
        }}
        aria-label="Menu"
        className="relative"
      >
        <Bag className="w-6 h-6" />
        {cart && (cart as any)?.items?.length > 0 && (
          <span className="absolute right-2 top-2 min-w-[1.25rem] min-h-[1.25rem] bg-primary-900 text-primary-100 rounded-full flex items-center justify-center text-xs font-bold">
            {(cart as any)?.items?.length}
          </span>
        )}
      </button>

      {dropdown === "cart" && (
        // <Clickoutside status={display} onClick={() => setDisplay(false)}>
        //   <div className="absolute right-0 w-[80vw] mt-2 md:w-[700px] max-w-[80vw] h-[80vh] bg-primary-100 rounded-md shadow-xl  z-50">
        //     {!cart || (cart as any)?.items?.length < 1 ? (
        //       <div className="flex flex-col items-center justify-center h-full px-4">
        //         <h2 className="text-2xl font-bold">Your cart is empty</h2>
        //       </div>
        //     ) : (
        //       <div className="flex flex-col p-6 space-y-6">
        //         <h2 className="text-3xl font-bold">My Cart</h2>
        //         <ul className="space-y-6 divide-y divide-primary-300">
        //           {(cart as any)?.items?.map((item: any) => (
        //             <CartItem
        //               key={item.id}
        //               item={item}
        //               currencyCode={(cart as any).currency}
        //             />
        //           ))}
        //         </ul>
        //         <div className="bg-primary-100 px-6 py-4 border-t border-primary-300">
        //           <ul className="space-y-2">
        //             <li className="flex justify-between text-lg">
        //               <span>Subtotal</span>
        //               <span>{subTotal}</span>
        //             </li>
        //             <li className="flex justify-between text-lg">
        //               <span>Taxes</span>
        //               <span>15%</span>
        //             </li>
        //           </ul>
        //           <div className="flex justify-between border-t border-primary-300 py-3 font-bold">
        //             <span>Total</span>
        //             <span>{total}</span>
        //           </div>
        //           <Link
        //             href="/checkout"
        //             onClick={() => handleDropdown("")}
        //             className="w-full bg-primary-900 text-primary-100 text-sm py-4 rounded-md flex justify-center items-center"
        //           >
        //             Proceed to Checkout
        //           </Link>
        //         </div>
        //       </div>
        //     )}
        //   </div>
        // </Clickoutside>
        <CartUI cart={cart}></CartUI>
      )}
    </div>
  );
};

export default CartButton;

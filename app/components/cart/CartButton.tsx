"use client";
import { useState } from "react";

import { Bag } from "@/app/components/icons";
import dynamic from "next/dynamic";
import type { Cart } from "@lib/types";


const Loading = () => (
    <div className="absolute right-0 w-[80vw] mt-2 md:w-[700px] max-w-[80vw] h-[80vh] bg-primary-100 rounded-md shadow-xl  z-50">
      {/* <LoadingDots /> */}
      Loading...
    </div>
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
  //console.log("cartt",cart);
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
      
        <CartUI cart={cart}></CartUI>
      )}
    </div>
  );
};

export default CartButton;

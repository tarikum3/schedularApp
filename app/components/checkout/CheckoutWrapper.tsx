import React, { useState } from "react";
import Delivery from "@/app/components/checkout/Delivery";
import Summary from "@/app/components/checkout/Summary";
const CheckoutWrapper = () => {
  return (
    <div className="mx-auto mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
      <Delivery />
      <Summary />
    </div>
  );
};

export default CheckoutWrapper;

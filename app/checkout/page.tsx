import React, { useState } from "react";
import CheckoutWrapper from "@/app/components/checkout/CheckoutWrapper";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default async function Checkout() {
  return (
    <>
      <CheckoutWrapper />
    </>
  );
}

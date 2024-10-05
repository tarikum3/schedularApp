"use client";
import React from "react";
import { Cart } from "@lib/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components";
const Summary = ({ cart }: { cart: Cart | undefined }) => {
  const router = useRouter();
  return (
    // <div className="min-w-80 w-1  space-y-8 m-3 p-4 border">
    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
      <div className="">
        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-primary-500 dark:text-primary-400">
              Subtotal
            </dt>
            <dd className="text-base font-medium text-primary-900 dark:text-primary-100">
              {cart?.subtotalPrice}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-primary-500 dark:text-primary-400">
              Shipping
            </dt>
            <dd className="text-base font-medium text-primary-900 dark:text-primary-100">
              {cart?.deliveryMethod == "fedex"
                ? 10
                : cart?.deliveryMethod == "dhl"
                ? 15
                : 0}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-primary-500 dark:text-primary-400">
              Tax
            </dt>
            <dd className="text-base font-medium text-primary-900 dark:text-primary-100">
              15%
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-bold text-primary-900 dark:text-primary-100">
              Total
            </dt>
            <dd className="text-base font-bold text-primary-900 dark:text-primary-100">
              {cart?.totalPrice}
            </dd>
          </dl>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          // className={s.link}
          disabled={cart?.step != "payment"}
          onClick={() => router.push("/payment")}
          className=" rounded-md inline-flex items-center justify-center w-full  text-primary-100 p-5 text-sm"
        >
          {" Proceed to Payment"}
        </Button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Summary;

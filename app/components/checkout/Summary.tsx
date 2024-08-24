"use client";
import React from "react";
import { Cart } from "@lib/prisma";
import Link from "next/link";
const Summary = ({ cart }: { cart: Cart | undefined }) => {
  return (
    // <div className="min-w-80 w-1  space-y-8 m-3 p-4 border">
    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
      <div className="">
        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Subtotal
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              {cart?.subtotalPrice}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Shipping
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              {cart?.deliveryMethod == "fedex"
                ? 10
                : cart?.deliveryMethod == "dhl"
                ? 15
                : 0}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Tax
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              15%
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 py-3">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              {cart?.totalPrice}
            </dd>
          </dl>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href={"/checkout"}
          // className={s.link}
          className="bg-secondary rounded-md inline-flex items-center justify-center w-full  text-primary p-5 text-sm"
        >
          {" Proceed to Payment"}
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Summary;

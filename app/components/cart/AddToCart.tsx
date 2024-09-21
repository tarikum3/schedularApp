"use client";

// import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { addItem } from "@lib/actions/actions";
//import LoadingDots from '@components/loading-dots';
//import { ProductVariant } from '@lib/shopify/types';
//import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@lib/types";
import { Button, ErrorMessage } from "@/app/components";

export function AddToCart({ variants: product }: { variants: Product }) {
  const [message, formAction] = useFormState(addItem, null);
  const { pending } = useFormStatus();
  const actionWithVariant = formAction.bind(null, product.id);
  const variant = product.variants[0];
  return (
    <form action={actionWithVariant}>
      {/* <Button
                  onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                    if (pending) e.preventDefault();
                  }}
                  aria-label="Add to cart"
                //type="button"
                className={"w-5/6 py-2 px-6 rounded-lg"}
              
                loading={loading}
                disabled={variant?.availableForSale === false}
              >
                {variant?.availableForSale === false
                  ? "Not Available"
                  : "Add To Cart"}
              </Button> */}
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add cart item"
      aria-disabled={pending}
      className="flex p-1 border-primary-300 border items-center justify-center hover:bg-primary-300 disabled:cursor-not-allowed"
      // className={cn(s.actions)}
    ></button>
  );
}

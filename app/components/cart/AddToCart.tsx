// "use client";

// import { addItem } from "@lib/actions/actions";

// import { useFormState, useFormStatus } from "react-dom";
// import type { Product } from "@lib/types";

// export function AddToCart({ variants: product }: { variants: Product }) {
//   const [message, formAction] = useFormState(addItem, null);
//   const { pending } = useFormStatus();
//   const actionWithVariant = formAction.bind(null, product.id);
//   const variant = product.variants[0];
//   return (
//     <form action={actionWithVariant}>
//       <SubmitButton />
//       <p aria-live="polite" className="sr-only" role="status">
//         {message}
//       </p>
//     </form>
//   );
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       onClick={(e: React.FormEvent<HTMLButtonElement>) => {
//         if (pending) e.preventDefault();
//       }}
//       aria-label="Add cart item"
//       aria-disabled={pending}
//       className="flex p-1 border-primary-300 border items-center justify-center hover:bg-primary-300 disabled:cursor-not-allowed"
//       // className={cn(s.actions)}
//     ></button>
//   );
// }

"use client";

//import clsx from "clsx";
import { addItem } from "@lib/actions/actions";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Product, ProductVariant } from "@lib/prisma";
import { Button, ErrorMessage } from "@/app/components";
export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.variantOptions.every((option) => {
      const optionValue = option.optionValue;
      const optionName = option.optionValue.option.name;
      return optionValue.value === searchParams.get(optionName.toLowerCase());
    })
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const title = !availableForSale
    ? "Out of stock"
    : !selectedVariantId
    ? "Please select options"
    : undefined;

  return (
    <Button
      aria-label="Add item to cart"
      disabled={isPending || !availableForSale || !selectedVariantId}
      title={title}
      loading={isPending}
      onClick={() => {
        // Safeguard in case someone messes with `disabled` in devtools.
        if (!availableForSale || !selectedVariantId) return;

        startTransition(async () => {
          const error = await addItem(null, selectedVariantId);

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }

          router.refresh();
        });
      }}
    >
      {/* <div className="absolute left-0 ml-4">
        {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
      </div> */}
      {availableForSale ? "Add To Cart" : "Out Of Stock"}
    </Button>
  );
}

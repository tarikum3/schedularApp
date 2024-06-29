"use client";

import { Plus, Minus } from "@/app/components/icons";
import { updateCartItem } from "@lib/actions/actions";
import type { LineItem } from "@lib/types";

import { useFormState, useFormStatus } from "react-dom";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className="flex p-1 border-primary-2 border items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
      // className={cn(s.actions)}
    >
      {type === "plus" ? (
        <Plus width={18} height={18} />
      ) : (
        <Minus width={18} height={18} />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  currencyCode,
}: {
  item: LineItem;
  type: "plus" | "minus";
  currencyCode?: string;
}) {
  const [message, formAction] = useFormState(updateCartItem, null);
  const payload = {
    id: item?.id,
    //  productId: item?.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

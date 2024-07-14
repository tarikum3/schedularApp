"use client";

import { removeItem } from "@lib/actions/actions";
import type { LineItem } from "@lib/types";

import { useFormState, useFormStatus } from "react-dom";
import { Cross } from "@/app/components/icons";
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className="flex  border-primary-2 border rounded-full h-10 w-10 text-lg items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
      // className={cn(s.actions)}
    >
      <Cross width={18} height={18} />
    </button>
  );
}

export function DeleteItemButton({ item }: { item: LineItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

"use client";

import { removeItem } from "@lib/actions/actions";
import type { LineItem } from "@lib/types";

import { useFormState, useFormStatus } from "react-dom";

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
      className="flex p-1 border-primary-2 border items-center justify-center hover:bg-primary-2 disabled:cursor-not-allowed"
      // className={cn(s.actions)}
    ></button>
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

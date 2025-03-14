"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto my-8 flex max-w-xl flex-col rounded-lg  bg-primary-100 p-10 shadow-lg transition-shadow duration-300 ease-in-out md:p-12">
      <p className="my-4 text-center text-primary-500">Something went wrong!</p>
      <button
        className="mx-auto mt-4 flex w-full max-w-xs items-center justify-center rounded-full bg-primary-600 p-4 tracking-wide text-primary-0 transition-all duration-200 hover:bg-primary-500 hover:shadow-md"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}

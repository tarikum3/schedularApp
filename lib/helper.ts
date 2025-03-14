import { deleteCookies } from "@lib/actions/actions";

import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { z } from "zod";

export { deleteCookies };
interface Rule {
  field: string;
  condition: string;
  value: string;
}
//export type ProductFields = keyof Product extends string ? keyof Product : never;
export const dateSchema = z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  });

export function rangeMap(n: number, fn: (i: number) => any) {
  const arr = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

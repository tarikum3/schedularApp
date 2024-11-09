"use client";

import clsx from "clsx";

import { createUrl } from "@lib/helper";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Product, ProductVariant, ProductOption } from "@lib/prisma";
type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export default function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.variantOptions.reduce((accumulator, option) => {
      const optionValue = option.optionValue;
      const optionName = option.optionValue.option.name;

      return {
        ...accumulator,
        [optionName.toLowerCase()]: optionValue.value,
      };
    }, {}),
  }));

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((OptionValue) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, OptionValue.value);
          const optionUrl = createUrl(pathname, optionSearchParams);

       
          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option) =>
                  option.name.toLowerCase() === key &&
                  option.values.some(
                    (OptionValue) => OptionValue.value === value
                  )
              )
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] === value && combination.availableForSale
            )
          );

          // The option is active if it's in the url params.
          const isActive =
            searchParams.get(optionNameLowerCase) === OptionValue.value;

          // You can't disable a link, so we need to render something that isn't clickable.
          const DynamicTag = isAvailableForSale ? Link : "p";
          const dynamicProps = {
            ...(isAvailableForSale && { scroll: false }),
          };

          return (
            <DynamicTag
              key={OptionValue.value}
              aria-disabled={!isAvailableForSale}
              href={optionUrl}
              title={`${option.name} ${OptionValue.value}${
                !isAvailableForSale ? " (Out of Stock)" : ""
              }`}
              className={clsx(
                "flex min-w-[48px] items-center  justify-center rounded-full  bg-primary-300 px-2 py-1 text-sm ",
                {
                  "cursor-default text-primary-900 border border-primary-900": isActive,
                  " transition duration-300 ease-in-out hover:scale-110  text-primary-900":
                    !isActive && isAvailableForSale,
                  " cursor-not-allowed  bg-primary-300 text-primary-500   ":
                    !isAvailableForSale,
                }
              )}
              {...dynamicProps}
            >
              {OptionValue.value}
            </DynamicTag>
          );
        })}
      </dd>
    </dl>
  ));
}

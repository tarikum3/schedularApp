"use client";
import { FC } from "react";
import Link from "next/link";
import type { Product } from "@lib/types";
import Image from "next/image";
import usePrice from "@lib/hooks/use-price";

interface Props {
  //product: Product;
  product: any;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<Props> = ({ product }) => {
  const { price } = usePrice({
    // amount: product.price.value,
    // baseAmount: product.price.retailPrice,
    // currencyCode: product.price.currencyCode!,
    amount: product.price.amount,
    currencyCode: product.price.currency!,
  });

  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative max-h-full w-full box-border overflow-hidden
      bg-no-repeat bg-center bg-cover transition-transform
      ease-linear cursor-pointer inline-block bg-white"
      aria-label={product.name}
    >
      <>
        <div
          //className={s.imageContainer}
          className="overflow-hidden rounded-[10px] w-full "
        >
          <Image
            alt={product.name || "Product Image"}
            src={product.images[0]?.url}
            width={540}
            height={540}
            quality="85"
            // {...imgProps}
          />
        </div>

        <div className="transition-colors ease-in-out duration-500">
          <h3 className=" max-w-full w-full text-sm leading-extra-loose py-4 px-6 bg-primary md:text-2xl text-secondary font-bold">
            <span>{product.name}</span>
          </h3>
          <div className="pt-2 px-6 pb-4 text-sm bg-primary text-secondary font-semibold inline-block tracking-wide md:text-md">{`${price} ${product.price?.currency}`}</div>
        </div>
      </>
      {/* )} */}
    </Link>
  );
};

export default ProductCard;

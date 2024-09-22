"use client";
import { FC } from "react";
import Link from "next/link";
//import type { Product } from "@lib/types";
import Image from "next/image";
import usePrice from "@/lib/use-price";
import { Product } from "@lib/prisma";
import { encodeProductName } from "@/lib/helper";
interface Props {
  //product: Product;
  product: Product;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<Props> = ({ product }) => {
  const { price } = usePrice({
    amount: product.price!.amount,
    currencyCode: product.price!.currency!,
  });

  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out overflow-hidden cursor-pointer"
      aria-label={product.name}
    >
      {/* Image Section */}
      <div className="overflow-hidden rounded-t-lg">
        <Image
          alt={product.name || "Product Image"}
          src={product.images[0]?.url}
          width={540}
          height={540}
          quality="85"
          className="w-full h-auto object-cover transition-transform transform hover:scale-105 duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 bg-primary-100 rounded-b-lg">
        {/* Product Name */}
        <h3 className="text-primary-900 text-base md:text-lg font-medium mb-1 leading-tight line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-primary-600 text-sm md:text-md font-semibold mt-2">
          {`${price} ${product.price?.currency}`}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

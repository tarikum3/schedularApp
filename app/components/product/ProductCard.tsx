"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import usePrice from "@/lib/use-price";
import { Product } from "@lib/prisma";

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
  //console.log("productsnewwwfront", product);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative w-full max-w-sm bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out overflow-hidden cursor-pointer"
      aria-label={product.name}
    >
      {/* Image Section */}
      <div className="relative block overflow-hidden rounded-t-lg min-h-[400px]">
        <Image
          alt={product.name || "Product Image"}
          src={product.images[0]?.url}
          // width={540}
          // height={540}
          quality="85"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
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

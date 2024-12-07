"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import usePrice from "@/lib/use-price";
import { Product } from "@lib/prisma";

interface Props {
  //product: Product;
  product: Product;
  imageProps?:React.ComponentProps<typeof Image>;
  linkProps?:Partial<React.ComponentProps<typeof Link>>;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<Props> = ({ product,imageProps,linkProps }) => {
  const { price } = usePrice({
    amount: product.price!.amount,
    currencyCode: product.price!.currency!,
  });
  //console.log("productsnewwwfront", product);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="relative w-full bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out overflow-hidden cursor-pointer"
      aria-label={product.name}
      {...linkProps}
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
          sizes='(min-width: 768px) 33vw, 100vw'
          style={{
            objectFit: "contain", // cover, contain, none
          
          }}
          {...imageProps}
          
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

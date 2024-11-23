"use client";
import Image from "next/image";
import { FC,  } from "react";

import usePrice from "@/lib/use-price";
import { SEO } from "@/app/components/common";


import { Product } from "@lib/prisma";

import { VariantSelector } from "@/app/components/product";
import { AddToCart } from "@/app/components/cart/AddToCart";
interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price!.amount,
    currencyCode: product.price!.currency!,
  });

 
 
  return (
    <>
      <div className="py-8 px-6 md:py-12 md:px-10 bg-primary-100">
        <div className="mx-auto grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8 ">
          {/* Product Image */}
          <div className="relative flex justify-center lg:order-1 lg:col-span-2 ">
            {product?.images && (
              <Image
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || "Product Image"}
                // height={400}
                // width={400}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               className="object-contain "
              />
            )}
          </div>

          {/* Product Details */}
          <div className="lg:order-2 lg:mt-0 space-y-6 lg:col-span-1">
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-primary-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-2xl font-semibold text-primary-900">
              {price}
            </div>
            <VariantSelector
              options={product.options}
              variants={product.variants}
            />
     
         
            {/* Product Description */}
            <p className="text-lg text-primary-800 tracking-normal">{product.description}</p>
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
          </div>
        </div>
      </div>


      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: "website",
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: "800",
              height: "600",
              alt: product.name,
            },
          ],
        }}
      />
    </>
  );
};


export default ProductView;

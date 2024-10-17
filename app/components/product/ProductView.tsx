"use client";
import Image from "next/image";
import { FC, useState } from "react";

import usePrice from "@/lib/use-price";
import { SEO } from "@/app/components/common";
import { Button, ErrorMessage } from "@/app/components";
import { addItem } from "@lib/actions/actions";

import { Product } from "@lib/prisma";
import { useSession } from "next-auth/react";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const { data: session, status } = useSession();
  const variant = product.variants[0];
  const addToCart = async () => {
    setLoading(true);
    setError(null);
    try {
      await addItem(null, variant ? variant.id : product.variants[0]?.id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err);
        setError({
          ...err,
          message: "Could not add item to cart. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <div className="py-8 px-6 md:py-12 md:px-10 bg-white">
        <div className="mx-auto grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 min-h-[500px]">
          {/* Product Image */}
          <div className="relative flex justify-center lg:order-2 lg:row-span-6 ">
            {product?.images && (
              <Image
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || "Product Image"}
                // height={400}
                // width={400}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="lg:order-1 lg:mt-0 space-y-6">
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-primary-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-2xl font-semibold text-primary-800">
              {price}
            </div>
            <VariantSelector
              options={product.options}
              variants={product.variants}
            />
            {/* Add to Cart Button */}
            {/* <div>
              {error && <ErrorMessage error={error} className="my-4" />}
              <Button
                aria-label="Add to Cart"
                type="button"
                className="w-full md:w-2/3 py-3 text-xl font-medium bg-primary-700 text-primary-100 rounded-md hover:bg-primary-600 transition-colors"
                onClick={addToCart}
                loading={loading}
                disabled={variant?.quantity === 0 || !!session?.user}
              >
                {variant?.quantity === 0 ? "Not Available" : "Add To Cart"}
              </Button>
            </div> */}
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
            {/* Product Description */}
            <p className="text-lg text-primary-600">{product.description}</p>
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

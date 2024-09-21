"use client";
import Image from "next/image";
import { FC, useState } from "react";
// import type { Product } from "@lib/types";
import usePrice from "@/lib/use-price";
import { SEO } from "@/app/components/common";
import { Button, ErrorMessage } from "@/app/components";
import { addItem } from "@lib/actions/actions";

import { Product } from "@lib/prisma";
//import { useAddCartMutation } from "@framework/services/cart";
interface ProductViewProps {
  // product: Product;
  // relatedProducts: Product[];
  product: Product;
  relatedProducts: Product[];
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  // console.log("productsssproduct", product);
  const { price } = usePrice({
    amount: product.price!.amount,
    // baseAmount: product.price.retailPrice,
    currencyCode: product.price!.currency!,
  });

  // const [addCart] = useAddCartMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const variant = product.variants[0];
  //console.log("variii", variant);
  const addToCart = async () => {
    setLoading(true);
    setError(null);
    try {
      // await addCart({
      //   productId: String(product.id),
      //   variantId: String(variant ? variant.id : product.variants[0]?.id),
      // });
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
      <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div className=" min-h-[500px]  mx-auto grid grid-cols-1  lg:gap-x-20 lg:grid-cols-2">
          <div className="  col-start-1  row-start-1 sm:mb-6  lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 ">
            {product?.images && (
              <Image
                quality="85"
                src={product.images[0]?.url || placeholderImg}
                alt={product.name || "Product Image"}
                height={320}
                width={320}
                className={
                  "w-full  object-cover rounded-lg  sm:col-span-2 lg:col-span-full"
                }
              />
            )}
          </div>

          <div className="mt-4 col-start-1   lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
            <div className="flex flex-col space-y-2 m-1">
              <h3
                className={
                  "py-4 px-6 bg-primary-100 text-primary-900  font-bold"
                }
              >
                <span
                  className={""}
                  style={{
                    fontSize: `${32}px`,
                    lineHeight: `${32}px`,
                  }}
                >
                  {product.name}
                </span>
              </h3>
              <div className="pt-2 px-6 pb-4 text-md bg-primary-100 text-primary-900  font-semibold inline-block tracking-wide">
                {price}
              </div>
              <div>
                {error && <ErrorMessage error={error} className="my-5" />}

                <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={"w-4/6 !text-xl"}
                  onClick={addToCart}
                  loading={loading}
                  // disabled={variant?.availableForSale === false}
                  disabled={variant?.quantity === 0}
                >
                  {/* {variant?.availableForSale === false */}
                  {variant?.quantity === 0 ? "Not Available" : "Add To Cart"}
                </Button>
              </div>
            </div>
            <p className="mt-4 px-6  text-xl  col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
              {product.description}
            </p>
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

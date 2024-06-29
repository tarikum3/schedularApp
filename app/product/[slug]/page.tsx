// import type {
//   GetStaticPathsContext,
//   GetStaticPropsContext,
//   InferGetStaticPropsType,
// } from "next";
// import { useRouter } from "next/router";
// import { Layout } from "@components/common";
import { ProductView } from "@/app/components/product";

// import getAllProducts from "@lib/operations/getAllProducts";
// import getProduct from "@lib/operations/getProduct";
import { getAllProducts, getProduct } from "@lib/services";
// import getAllProductPaths from "@framework/operations/getAllProductPaths";
//import { unstable_noStore as noStore } from "next/cache";

export async function getProductPage(params: { slug: string }) {
  //noStore();

  const productPromise = getProduct({
    variables: { slug: params!.slug },
  });

  const allProductsPromise = getAllProducts({
    variables: { first: 4 },
  });

  const { product } = await productPromise;
  const { products: relatedProducts } = await allProductsPromise;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    product,
    relatedProducts,
  };
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = await getProductPage(params);

  return <ProductView product={product!} relatedProducts={relatedProducts!} />;
}

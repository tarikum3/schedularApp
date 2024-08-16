import { ProductView } from "@/app/components/product";

//import { getAllProducts, getProduct } from "@lib/services";
import {
  fetchProducts,
  fetchProductBySlug,
} from "@lib/services/prismaServices";
import { decodeProductName } from "@lib/utils";
//import { unstable_noStore as noStore } from "next/cache";

export async function getProductPage(params: { slug: string }) {
  //noStore();

  // const productPromise = getProduct({
  //   variables: { slug: params!.slug },
  // });
  //const slugDe = decodeProductName(params!.slug);
  const product = await fetchProductBySlug(params!.slug);
  const { products: relatedProducts } = await fetchProducts({});
  // const allProductsPromise = getAllProducts({
  //   variables: { first: 4 },
  // });

  // const { product } = await productPromise;
  //  const { products: relatedProducts } = await allProductsPromise;

  // if (!product) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    product: product as any,
    relatedProducts: relatedProducts as any,
  };
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = await getProductPage(params);

  return <ProductView product={product!} relatedProducts={relatedProducts!} />;
}

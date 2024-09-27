import { ProductView } from "@/app/components/product";

//import { getAllProducts, getProduct } from "@lib/services";
import {
  fetchProducts,
  fetchProductBySlug,
} from "@lib/services/prismaServices";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  //const product = await getProduct(params.handle);
  const product = await fetchProductBySlug(params!.slug);
  if (!product) return notFound();

  const { url } = product.images[0] || {};

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              // width,
              // height,
              // alt
            },
          ],
        }
      : null,
  };
}
async function getProductPage(params: { slug: string }) {
  const product = await fetchProductBySlug(params!.slug);
  const { products: relatedProducts } = await fetchProducts({});

  return {
    product: product as any,
    relatedProducts: relatedProducts as any,
  };
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = await getProductPage(params);

  return <ProductView product={product!} relatedProducts={relatedProducts!} />;
}

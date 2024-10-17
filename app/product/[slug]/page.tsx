import { ProductView } from "@/app/components/product";
import {
  fetchProducts,
  fetchProductBySlug,
} from "@lib/services/prismaServices";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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
async function getProduct(params: { slug: string }) {
  const product = await fetchProductBySlug(params!.slug);
  if (!product) return notFound();
  const { products: relatedProducts } = await fetchProducts({});

  return {
    product: product,
    relatedProducts: relatedProducts,
  };
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = await getProduct(params);

  return <ProductView product={product!} relatedProducts={relatedProducts!} />;
}

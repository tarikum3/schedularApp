import { Product } from "@lib/prisma";
import { fetchProducts, fetchCollections } from "@lib/services/prismaServices";
import { MetadataRoute } from "next";
export const dynamic = "force-dynamic";
type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = fetchCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.title}`,
      lastModified: new Date(
        (collection as any).updatedAt ?? (collection as any).createdAt
      ).toISOString(),
    }))
  );

  const productsPromise = fetchProducts({}).then(({ products }) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(
        (product as any).updatedAt ?? (product as any).createdAt
      ).toISOString(),
    }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}

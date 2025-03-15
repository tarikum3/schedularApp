import { MetadataRoute } from "next";
export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routesMap];
}

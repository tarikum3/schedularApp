import { ProductCard } from "@/app/components/product";

import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";
import { Product } from "@lib/prisma";
import { fetchProducts } from "@lib/services/prismaServices";
import { Suspense } from "react";

const getHomeProducts = async () => {
  const productsPromise = await fetchProducts({});

  return productsPromise;
};

//export const revalidate = 3600;
export const dynamic = "force-dynamic";
export const runtime = 'edge';

export const metadata = {
  description: 'Modalinda shop .',
  openGraph: {
    type: 'website'
  }
};
export default async function Home() {
  const productsPromise = await getHomeProducts();
  const { products } = productsPromise;

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center bg-primary-700 py-16 px-8 w-4/5 mx-auto h-[70vh] rounded-xl mt-20 mb-12 shadow-lg">
        <h2 className="text-3xl text-center text-primary-100 font-bold tracking-tight font-serif mb-4 md:text-5xl">
          New Arrivals
        </h2>

        <p className="text-base text-center text-primary-300 font-light leading-relaxed lg:text-lg max-w-lg">
          Explore the latest trends in fashion and discover stylish new clothing
          in our shop.
        </p>

        <Link
          href="/collection/new-arrivals"
          className="bg-primary-100 text-primary-700 text-lg font-semibold py-3 px-8 rounded-lg mt-8 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Explore
        </Link>
      </div>

      {/* Product Grid Section */}
      <div className="w-4/5 mx-auto mb-12">
        <p className="text-xl text-primary-900 font-semibold mb-8 md:mx-24 lg:text-2xl">
          Explore Products
        </p>

        {/* <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 9).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Link
            href="/search"
            className="flex items-center text-primary-700 font-semibold hover:text-primary-900 transition-colors duration-300 ease-in-out"
          >
            <span className="mr-2">More</span>
            <ArrowRight className="text-primary-700" />
          </Link>
        </div> */}
        <Suspense>
          <ExploreProducts products={products} />
        </Suspense>
      </div>
    </>
  );
}

async function ExploreProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 9).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Link
          href="/search"
          className="flex items-center text-primary-700 font-semibold hover:text-primary-900 transition-colors duration-300 ease-in-out"
        >
          <span className="mr-2">More</span>
          <ArrowRight className="text-primary-700" />
        </Link>
      </div>
    </>
  );
}

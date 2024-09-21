import { ProductCard } from "@/app/components/product";

import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";

import { fetchProducts } from "@lib/services/prismaServices";
const getHomeProducts = async () => {
  const productsPromise = await fetchProducts({});

  return productsPromise;
};

//export const revalidate = 3600;
export const dynamic = "force-dynamic";
export default async function Home() {
  const productsPromise = await getHomeProducts();

  const { products } = productsPromise;

  //simulate delay
  //await new Promise((resolve) => setTimeout(resolve, 9000));
  return (
    <>
      <div className=" relative flex flex-col items-center justify-center bg-primary-700 m-28 mx-auto w-4/5 h-[80vh] rounded-xl">
        <h2 className="text-2xl text-center text-primary-100 font-bold font-serif m-1 relative md:text-4xl ">
          New arrivals
        </h2>

        <p className="text-lg text-center text-primary-300 font-light leading-relaxed relative lg:text-xl">
          explore new and stylish clothes in our shop .
        </p>

        <Link
          href={"/collection/new-arrivals"}
          // className={s.link}
          className="bg-primary-100 text-lg text-primary-700 font-bold py-2 px-10 rounded m-8 relative cursor-pointer "
        >
          {" explore"}
        </Link>
      </div>

      <div className=" m-10 ">
        <p className="text-lg text-primary-900  font-bold m-5 mx-auto md:mx-24  lg:text-xl ">
          {" "}
          Explore Products{" "}
        </p>

        <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
          {products.slice(0, 9).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className=" mx-auto md:mx-24 ">
          <Link
            href="/search"
            className="flex flex-initial items-center justify-end font-bold    "
          >
            <span className=" mr-2">more</span>
            <span className=" mr-2">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

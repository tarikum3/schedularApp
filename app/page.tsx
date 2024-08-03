//import { Layout } from "@components/common";
import { ProductCard } from "@/app/components/product";

//import getAllProducts from "@lib/operations/getAllProducts";
//import { getAllProducts } from "@lib/services";
//import { unstable_noStore as noStore } from 'next/cache';
import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";

//import { cache } from "react";
import prisma from "@lib/prisma";
import { fetchProducts } from "@lib/services/prismaServices";
export const getHomeProducts = async () => {
  // const productsPromise = getAllProducts({
  //   variables: { first: 8 },
  //   //cache: "no-store",
  // });
  const productsPromise = await fetchProducts({});
  return productsPromise;
};

//export const revalidate = 3600;
export const dynamic = "force-dynamic";
export default async function Home() {
  const productsPromise = await getHomeProducts();

  const { products } = productsPromise;
  // const result = await prisma.user.create({
  //   data: {
  //     name: "tariku",
  //     email: "tarikjj@gmail.com",
  //     image: "http",
  //   },
  // });
  // console.log("userprismaresult", result);
  // // res.json(result);
  // const user = await prisma.user.findMany({
  //   orderBy: [
  //     {
  //       createdAt: "desc",
  //     },
  //   ],
  // });
  // console.log("userprisma", user);
  // console.log("userprisma", prisma);

  // const productsss = await fetchProducts({});
  // console.log("productsss", productsss);

  //simulate delay
  //await new Promise((resolve) => setTimeout(resolve, 9000));
  return (
    <>
      <div className=" relative flex flex-col items-center justify-center bg-secondary-2 m-28 mx-auto w-4/5 h-[80vh] rounded-xl">
        {/* <div className="animate-ping bg-gray-500 z-0 absolute  h-1/2 w-1/2  "></div> */}
        <h2 className="text-5xl text-center text-primary font-bold m-8 relative md:text-7xl ">
          New arrivals
        </h2>

        <p className="text-2xl text-center text-primary-2 leading-relaxed relative lg:text-4xl">
          explore new and stylish clothes in our shop
        </p>

        <Link
          href={"/collection/new-arrivals"}
          // className={s.link}
          className="bg-primary text-2xl text-secondary-2 font-bold py-2 px-10 rounded m-8 relative cursor-pointer "
        >
          {" explore"}
        </Link>
      </div>

      <div className=" m-10 ">
        <p className="text-lg text-secondary font-bold m-5 mx-auto md:mx-24 md:text-xl lg:text-5xl ">
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

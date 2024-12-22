import { ProductCard,ProductsSkeleton } from "@/app/components/product";

import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";
import { Product } from "@lib/prisma";
import { fetchProducts } from "@lib/services/prismaServices";
import { Suspense } from "react";
import Hero from "@/app/components/home/Hero";
import Image from "next/image";

export const dynamic = "force-dynamic";
const getHomeProducts = async () => {
  const productsPromise = await fetchProducts({});

  return productsPromise;
};

//export const revalidate = 3600;
//export const revalidate = 3600;
export const metadata = {
  description: "Modalinda shop.",
  openGraph: {
    type: "website",
  },
};
export default async function Home() {
  return (
    <>
      {/* <div className="relative flex flex-col items-center justify-center bg-primary-900 py-16 px-8 w-4/5 mx-auto h-[70vh] rounded-xl mt-20 mb-12 shadow-lg">
        <h2 className="text-3xl text-center text-primary-100 font-bold tracking-tight font-serif mb-4 md:text-5xl">
          New Arrivals
        </h2>

        <p className="text-base text-center text-primary-100 font-light leading-relaxed lg:text-lg max-w-lg">
          Explore the latest trends in fashion and discover stylish new clothing
          in our shop.
        </p>

        <Link
          href="/search/?sort=createdAt&order=desc"
          className="bg-primary-100 text-primary-800 text-lg font-semibold py-3 px-8 rounded-lg mt-8 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Explore
        </Link>
      </div> */}
<Hero/>
      {/* Product Grid Section */}
      <div className=" mx-auto mb-12  px-10 py-5">
        <Suspense fallback={<ProductsSkeleton></ProductsSkeleton>}>
          <ExploreProducts />
        </Suspense>
      </div>

    
      {/* <FinalStockSection /> */}
    </>
  );
}

async function ExploreProducts() {
  const productsPromise = await getHomeProducts();
  const { products } = productsPromise;
  //console.log("productsnewww", products);
  if (!products.length) return null;
  //await new Promise((resolve) => setTimeout(resolve, 9000)); //  seconds delay
  return (
    <>
      <p className="text-xl text-primary-900 font-semibold mb-8 lg:text-2xl">
        Explore Products
      </p>
      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 9).map((product: any) => (
          <ProductCard key={product.id} product={product} linkProps={{prefetch:false}} />
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



async function FinalStockSection() {

  const productsPromise = await getHomeProducts();
  const { products } = productsPromise;
  //console.log("productsnewww", products);
  if (!products.length) return null;

  return (
    // <section className="relative bg-[#1e2939] text-white py-16">
    //   <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
    //     {/* Left Text Section */}
    //     <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
    //       <h2 className="text-3xl lg:text-4xl font-bold mb-4">
    //         Final Stock. Up to 50% off.
    //       </h2>
    //       <p className="text-lg mb-6">Don't miss out on our exclusive sale!</p>
    //       <Link
    //         href="/search?discount=true"
    //         className="inline-block text-lg font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
    //       >
    //         Shop the sale →
    //       </Link>
    //     </div>

    //     {/* Right Grid Section */}
    //     <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
    //       {products.slice(0, 4).map((product, index) => (
    //         <div
    //           key={product.id}
    //           className={`relative overflow-hidden rounded-lg shadow-lg ${
    //             index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
    //           }`}
    //         >
    //           <Image
    //             src={product.images[0]?.url || "/placeholder.png"}
    //             alt={product.name}
    //             width={500}
    //             height={500}
    //             className="object-cover w-full h-full"
    //           />
    //           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    //             <h3 className="text-xl font-semibold">{product.name}</h3>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Overlap Effect */}
    //   <div className="absolute -top-8 inset-x-0 h-8 bg-[#1e2939]" />
    // </section>

  //   <section className="relative bg-[#1e2939] text-white py-16">
  //   <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
  //     {/* Left Text Section */}
  //     <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
  //       <h2 className="text-3xl lg:text-4xl font-bold mb-4">
  //         Final Stock. Up to 50% off.
  //       </h2>
  //       <p className="text-lg mb-6">Don't miss out on our exclusive sale!</p>
  //       <Link
  //         href="/search?discount=true"
  //         className="inline-block text-lg font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
  //       >
  //         Shop the sale →
  //       </Link>
  //     </div>

  //     {/* Right Grid Section */}
  //     <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
  //       {products.slice(0, 6).map((product, index) => (
  //         <div
  //           key={product.id}
  //           className={`relative overflow-hidden rounded-lg shadow-lg ${
  //             index % 3 === 1 ? "-translate-y-12 z-10" : "translate-y-0"
  //           } ${
  //             index % 3 === 1
  //               ? "bg-transparent"
  //               : "bg-[#1e2939] border border-gray-700"
  //           }`}
  //           style={
  //             index % 3 === 1
  //               ? { marginTop: "-2rem", background: "none" }
  //               : undefined
  //           }
  //         >
  //           <Image
  //             src={product.images[0]?.url || "/placeholder.png"}
  //             alt={product.name}
  //             width={500}
  //             height={500}
  //             className="object-cover w-full h-full"
  //           />
  //           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
  //             <h3 className="text-xl font-semibold">{product.name}</h3>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>

  //   {/* Overlap Effect */}
  //   <div className="absolute -top-8 inset-x-0 h-8 bg-[#1e2939]" />
  // </section>

  <section className="relative bg-[#1e2939] text-white py-1">
  <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
    {/* Left Text Section */}
    <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
        Final Stock. Up to 50% off.
      </h2>
      <p className="text-lg mb-6">Don't miss out on our exclusive sale!</p>
      <Link
        href="/search?discount=true"
        className="inline-block text-lg font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
      >
        Shop the sale →
      </Link>
    </div>

    {/* Right Grid Section */}
    <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {products.slice(0, 6).map((product, index) => (
        <div
          key={product.id}
          className={`relative overflow-hidden rounded-lg shadow-lg transition-transform ${
            index % 3 === 1
              ? "-translate-y-16 z-10" // Offset for middle row
              : "translate-y-0"
          }`}
        >
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-xl font-semibold">{product.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Overlap Effect for middle row */}
  <div className="absolute -top-8 inset-x-0 h-8 bg-[#1e2939]" />
</section>
  );
};





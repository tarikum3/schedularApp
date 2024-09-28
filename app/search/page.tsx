import { ProductCard } from "@/app/components/product";
import { unstable_noStore as noStore } from "next/cache";
//import { getAllProducts } from "@lib/services";
import { fetchProducts } from "@lib/services/prismaServices";

async function getSearchProducts(q: string) {
  noStore();
  // let search = "";

  // if (q) {
  //   search += `(product_type:${q}) OR (title:${q}) OR (tag:${q}) `;
  // }
  // const { products } = await getAllProducts({
  //   variables: { first: 8, query: search },
  //   cache: "no-cache",
  // });
  const { products } = await fetchProducts({ searchKey: q });

  return {
    products,
    found: !!products?.length,
    q: typeof q === "string" ? q : "",
  };
}

const SORT = {
  Name: "Trending",
  latest: "Latest arrivals",
  price: " Low to high",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const { products, found, q } = await getSearchProducts(query);

  const perPage = 2;
  const maxPage = Math.ceil(products?.length / perPage);

  return (
    <>
      <div className="m-12 text-xl text-gray-800 transition ease-in duration-75 mx-auto md:mx-24">
        {found ? (
          <span>
            Showing {products?.length} results{" "}
            {q && (
              <strong>
                for "<span className="font-semibold">{q}</span>"
              </strong>
            )}
          </span>
        ) : (
          <span>
            There are no products that match{" "}
            <strong>
              "<span className="font-semibold">{q}</span>"
            </strong>
          </span>
        )}
      </div>

      <div className="flex justify-end items-end mx-auto md:mx-24 mb-6">
        <div className="relative">
          {/* Additional controls can be added here */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mx-auto md:mx-24 lg:grid-cols-3">
        {products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 mb-12 text-center">
        {/* Optional pagination or load more button can go here */}
      </div>
    </>
  );
}

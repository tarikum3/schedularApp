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
    //  page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const { products, found, q } = await getSearchProducts(query);
  //console.log('usepro',dataaa);

  const perPage = 2;
  const maxPage = (products?.length - (products?.length % perPage)) / perPage;

  // if (error) {
  //   return <ErrorMessage error={error} />
  // }

  return (
    <>
      <div className="m-12 text-xl text-transition ease-in duration-75 mx-auto md:mx-24">
        <>
          <span className={!found ? "hidden" : ""}>
            Showing {products?.length} results{" "}
            {q && (
              <>
                for "<strong>{q}</strong>"
              </>
            )}
          </span>
          <span className={found ? "hidden" : ""}>
            <>
              There are no products that match "<strong>{q}</strong>"
            </>
          </span>
        </>
      </div>

      <div className="flex justify-end items-end   mx-auto md:mx-24">
        <div className="relative "></div>
      </div>

      <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
        {products?.map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

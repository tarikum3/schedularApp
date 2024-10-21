import { ProductCard } from "@/app/components/product";
import { unstable_noStore as noStore } from "next/cache";

import { fetchProducts, productSortField } from "@lib/services/prismaServices";
export const dynamic = "force-dynamic";
async function getSearchProducts({
  q,
  sort,
  order,
}: {
  q: string;
  sort?: string;
  order?: string;
}) {
  noStore();
  let sortBy: any;
  if (sort && productSortField.includes(sort)) {
    sortBy = { field: sort, order: order == "asc" ? order : "desc" };
  }

  const { products } = await fetchProducts({
    searchKey: q,
    // sort: { field: sort },
    ...(sortBy && { sort: sortBy }),
  });

  return {
    products,
    found: !!products?.length,
    q: typeof q === "string" ? q : "",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    sort?: string;
    order?: string;
  };
}) {
  const query = searchParams?.q || "";
  const { sort, order } = { ...searchParams };
  const { products, found, q } = await getSearchProducts({
    q: query,
    sort,
    order,
  });

  return (
    <div className="relative flex flex-col py-16 px-8 gap-3">
      <div className=" text-xl mx-auto md:mx-24">
        {q && found ? (
          <span className="text-primary-700">
            Showing {products?.length} results{" "}
            {q && (
              <strong>
                for "<span className="font-semibold">{q}</span>"
              </strong>
            )}
          </span>
        ) : (
          q && (
            <span>
              There are no products that match{" "}
              <strong>
                "<span className="font-semibold">{q}</span>"
              </strong>
            </span>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 mx-auto md:mx-24 lg:grid-cols-3 ">
        {products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

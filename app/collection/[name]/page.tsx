import { ProductCard } from "@/app/components/product";
import { fetchCollection } from "@lib/services/prismaServices";
//import getCategories from "@lib/operations/getCategories";
// import { getCategories } from "@lib/services";
// import { CollectionEdge, Product as ShopifyProduct } from "@lib/schemas/schema";

// import { getCollectionProductsQuery, normalizeProduct } from "@lib/utils/helper";

// import fetcher from "@lib/fetcher";

// export async function getCollection(params: { name: string }) {

//   const categories = await getCategories();
//   //console.log("pathtn",params!.name);
//   const currentCategory = categories?.find(
//     (cat: any) => cat.slug == params!.name
//   );
//   let products;

//   const data = await fetcher<CollectionEdge>({
//     query: getCollectionProductsQuery,

//     variables: { categoryId: currentCategory?.id },
//   });

//   products = data.node?.products?.edges;

//   if (!currentCategory) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     products: products?.map(({ node }) =>
//       normalizeProduct(node as ShopifyProduct)
//     ),
//     found: !!products?.length,
//     collection: params!.name,
//   };
// }
async function getCollection(params: { name: string }) {
  const { products } = await fetchCollection({ title: params!.name });
  // if (!products) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    products,
    found: !!products?.length,
    collection: params!.name,
  };
}
export default async function Collection({
  params,
}: {
  params: { name: string };
}) {
  //simulate delate
  // await new Promise((resolve) => setTimeout(resolve, 9000));
  const { products, collection } = await getCollection(params);
  return (
    <div className=" m-10 ">
      <p className="capitalize text-5xl text-secondary text-center font-bold p-10 pb-24">
        {" "}
        {collection}{" "}
      </p>

      <div className="grid grid-cols-1 gap-4 mx-24 lg:grid-cols-3">
        {products?.slice(0, 9).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

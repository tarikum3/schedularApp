import { ProductCard } from "@/app/components/product";
import { fetchCollection } from "@lib/services/prismaServices";

async function getCollection(params: { name: string }) {
  const { products } = await fetchCollection({ title: params!.name });

  return {
    products,
    found: !!products?.length,
    collection: params!.name,
  };
}
// export default async function Collection({
//   params,
// }: {
//   params: { name: string };
// }) {
//   //simulate delate
//   // await new Promise((resolve) => setTimeout(resolve, 9000));
//   const { products, collection } = await getCollection(params);
//   return (
//     <div className=" m-10 ">
//       <p className="capitalize text-5xl text-primary-900  text-center font-bold p-10 pb-24">
//         {" "}
//         {collection}{" "}
//       </p>

//       <div className="grid grid-cols-1 gap-4 mx-24 lg:grid-cols-3">
//         {products?.slice(0, 9).map((product: any, i: number) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }
export default async function Collection({
  params,
}: {
  params: { name: string };
}) {
  const { products, collection } = await getCollection(params);

  return (
    <div className="m-10">
      <p className="capitalize text-5xl text-primary-900 text-center font-bold mb-12">
        {collection}
      </p>

      <div className="mb-2 grid grid-cols-1 gap-8 mx-auto md:mx-24 lg:grid-cols-3">
        {products?.slice(0, 9).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

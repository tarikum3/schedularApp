
import { rangeMap } from "@lib/helper";

export default function ProductsSkeleton(){


    return            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
    {rangeMap(12, (i) => (
      
        <ProductCardSkeleton key={i} />
      
    ))}
  </div>
  }





  export const ProductCardSkeleton = () => {
  return (
    <div className="relative w-full bg-primary-100 rounded-lg shadow-lg overflow-hidden">
      {/* Skeleton Image Section */}
      <div className="relative block overflow-hidden rounded-t-lg bg-gray-200 min-h-[400px] animate-pulse"></div>

      {/* Skeleton Content Section */}
      <div className="p-5 bg-primary-100 rounded-b-lg">
        {/* Skeleton Product Name */}
        <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2 animate-pulse"></div>

        {/* Skeleton Price */}
        <div className="h-4 bg-gray-300 rounded-md w-1/4 animate-pulse mt-2"></div>
      </div>
    </div>
  );
};

//export { ProductCardSkeleton};

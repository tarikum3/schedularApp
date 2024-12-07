
import { rangeMap } from "@lib/helper";

export default function ProductsSkeleton(){


    return            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
    {rangeMap(12, (i) => (
      
        <div className="w-full min-h-[400px]" />
      
    ))}
  </div>
  }
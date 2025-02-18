// "use client";

// import CustomersOverMonths from "@/app/components/admin/components/dashboard/Overview/CustomersOverMonths";

// export default function OverView() {
//   return (
//     <>
//       <div className=" flex flex-col  text-primary">
//              <CustomersOverMonths />
//       </div>
//     </>
//   );
// }

"use client";

import React, { Suspense } from "react";
import CustomersOverMonths from "@/app/components/admin/components/dashboard/Overview/CustomersOverMonths";
import OrderStatusSummary from "@/app/components/admin/components/dashboard/Overview/OrderStatusSummary";
import OrdersOverMonths from "@/app/components/admin/components/dashboard/Overview/OrdersOverMonths";
import CustomersAnalytics from "@/app/components/admin/components/dashboard/Analytics/CustomersAnalytics";

export default function OverView() {
  return (
    <div className="flex flex-col text-primary">
      {/* Wrap CustomersOverMonths in Suspense with a fallback */}
      <Suspense>
        <CustomersOverMonths />
      </Suspense>
      <Suspense>
        <OrderStatusSummary />
      </Suspense>
      <Suspense>
        <OrdersOverMonths />
      </Suspense>
    </div>
  );
}

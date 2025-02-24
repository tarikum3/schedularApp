// "use client";
// import React, { useEffect, useState, useMemo, useCallback } from "react";

// import Card from "@/app/components/admin/components/dashboard/elements/Card";
// import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
// import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

// const colors = ["#8884d8", "#82ca9d", "#ffc658"];

// const OrdersStatusSummary = () => {
//   const [dateRange, setDateRange] = useState<any>({
//     startDate: "",
//     endDate: "",
//   });
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const [ordersStatus, setOrdersStatus] = useState<any>({
//     totalorders: 0,
//     pending: 0,
//     confirmed: 0,
//     completed: 0,
//     canceled: 0,
//     refunded: 0,
//   });
//   const { data: OrdersStatusData } = useGetOverviewsQuery(
//     {
//       type: "OrdersStatus",
//       fromDate: dateRange?.startDate,
//       toDate: dateRange?.endDate,
//     },
//     { skip: !dateRange?.startDate }
//   );

//   const onTableDateRangeChange = useCallback(
//     (value: any) => {
//       setDateRange(value);
//     },
//     [dateRange]
//   );
//   console.log("newOrdersData", OrdersStatusData?.data);
//   useEffect(() => {
//     let OrdersStatus = (OrdersStatusData as any)?.data;
//     if (OrdersStatus) {
//       setOrdersStatus({
//         totalorders: OrdersStatus.totalorders,
//         pending: OrdersStatus.pending,
//         confirmed: OrdersStatus.confirmed,
//         completed: OrdersStatus.completed,
//         canceled: OrdersStatus.canceled,
//         refunded: OrdersStatus.refunded,
//       });
//     }
//   }, [OrdersStatusData]);

//   return (
//     <>
//       <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
//         <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
//           <div className="w-full max-w-3xl">
//             <h2 className="text-xl font-semibold text-center mb-4">
//               Orders Status Summary
//             </h2>
//             <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
//               <Card title="Total Orders" value={ordersStatus.totalorders} />
//               <Card title="Pending" value={ordersStatus.pending} />
//               <Card title="Confirmed" value={ordersStatus.Confirmed} />
//               <Card title="Completed" value={ordersStatus.completed} />
//               <Card title="Canceled" value={ordersStatus.canceled} />{" "}
//               <Card title="Refunded" value={ordersStatus.refunded} />
//             </div>
//           </div>
//         </div>
//       </DateWrapper>
//     </>
//   );
// };

// export default OrdersStatusSummary;

// "use client";
// import React, { useEffect, useState, useCallback } from "react";

// import Card from "@/app/components/admin/components/dashboard/elements/Card";
// import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
// import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

// interface OrdersStatus {
//   totalorders: number;
//   pending: number;
//   confirmed: number;
//   completed: number;
//   canceled: number;
//   refunded: number;
// }

// interface DateRange {
//   startDate: string;
//   endDate: string;
// }

// const OrdersStatusSummary = () => {
//   const [dateRange, setDateRange] = useState<DateRange>({
//     startDate: "",
//     endDate: "",
//   });

//   const [ordersStatus, setOrdersStatus] = useState<OrdersStatus>({
//     totalorders: 0,
//     pending: 0,
//     confirmed: 0,
//     completed: 0,
//     canceled: 0,
//     refunded: 0,
//   });

//   const { data: OrdersStatusData, error } = useGetOverviewsQuery(
//     {
//       type: "OrdersStatus",
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const onTableDateRangeChange = useCallback((value: DateRange) => {
//     setDateRange(value);
//   }, []);

//   useEffect(() => {
//     if (OrdersStatusData?.data) {
//       const OrdersStatus = OrdersStatusData.data;
//       setOrdersStatus({
//         totalorders: OrdersStatus.totalorders,
//         pending: OrdersStatus.pending,
//         confirmed: OrdersStatus.confirmed,
//         completed: OrdersStatus.completed,
//         canceled: OrdersStatus.canceled,
//         refunded: OrdersStatus.refunded,
//       });
//     }
//   }, [OrdersStatusData]);

//   if (error) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
//       <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
//         <div className="w-full max-w-3xl">
//           <h2 className="text-xl font-semibold text-center mb-4">
//             Orders Status Summary
//           </h2>
//           <div className="w-full mt-6 grid grid-cols-2 gap-3 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
//             <Card title="Total Orders" value={ordersStatus.totalorders} />
//             <Card title="Pending" value={ordersStatus.pending} />
//             <Card title="Confirmed" value={ordersStatus.confirmed} />
//             <Card title="Completed" value={ordersStatus.completed} />
//             <Card title="Canceled" value={ordersStatus.canceled} />
//             <Card title="Refunded" value={ordersStatus.refunded} />
//           </div>
//         </div>
//       </div>
//     </DateWrapper>
//   );
// };

// export default OrdersStatusSummary;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import Card from "@/app/components/admin/components/dashboard/elements/Card";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

interface OrdersStatus {
  totalorders: number;
  pending: number;
  confirmed: number;
  completed: number;
  canceled: number;
  refunded: number;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

const OrdersStatusSummary = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });

  const [ordersStatus, setOrdersStatus] = useState<OrdersStatus>({
    totalorders: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0,
    refunded: 0,
  });

  const { data: OrdersStatusData, error } = useGetOverviewsQuery(
    {
      type: "OrdersStatus",
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    },
    { skip: !dateRange.startDate }
  );

  const onTableDateRangeChange = useCallback((value: DateRange) => {
    setDateRange(value);
  }, []);

  useEffect(() => {
    if (OrdersStatusData?.data) {
      const OrdersStatus = OrdersStatusData.data;
      setOrdersStatus({
        totalorders: OrdersStatus.totalorders,
        pending: OrdersStatus.pending,
        confirmed: OrdersStatus.confirmed,
        completed: OrdersStatus.completed,
        canceled: OrdersStatus.canceled,
        refunded: OrdersStatus.refunded,
      });
    }
  }, [OrdersStatusData]);

  if (error) {
    return (
      <div className="text-red-500 text-center p-6">Error loading data</div>
    );
  }
  // <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
  return (
    <div className="bg-white text-primary-900 border p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-primary-900">
          Orders Status Summary
        </h2>
        <div className="ml-auto">
          <DateWrapper
            type="year"
            onTableDateRangeChange={onTableDateRangeChange}
          />
        </div>
      </div>

      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-4">
        <Card
          title="Total Orders"
          value={ordersStatus.totalorders}
          total={ordersStatus.totalorders}
          barColor="var(--primary-500)"
          trend="rise"
        />
        <Card
          title="Pending"
          value={ordersStatus.pending}
          total={ordersStatus.totalorders}
          // value={4}
          // total={10}
          barColor="var(--primary-400)"
          trend="decline"
        />
        <Card
          title="Confirmed"
          value={ordersStatus.confirmed}
          total={ordersStatus.totalorders}
          barColor="var(--primary-600)"
          trend="rise"
        />
        <Card
          title="Completed"
          value={ordersStatus.completed}
          total={ordersStatus.totalorders}
          barColor="var(--primary-700)"
          trend="rise"
        />
        <Card
          title="Canceled"
          value={ordersStatus.canceled}
          total={ordersStatus.totalorders}
          barColor="var(--primary-800)"
          trend="decline"
        />
        <Card
          title="Refunded"
          value={ordersStatus.refunded}
          total={ordersStatus.totalorders}
          barColor="var(--primary-900)"
          trend="decline"
        />
      </div>
    </div>

    // <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
    //   <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
    //     <div className="w-full max-w-6xl">
    //       <h2 className="text-2xl font-bold text-center mb-8 text-primary-900">
    //         Orders Status Summary
    //       </h2>
    //       <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-4">
    //         <Card
    //           title="Total Orders"
    //           value={ordersStatus.totalorders}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-500)"
    //           trend="rise"
    //         />
    //         <Card
    //           title="Pending"
    //           value={ordersStatus.pending}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-400)"
    //           trend="decline"
    //         />
    //         <Card
    //           title="Confirmed"
    //           value={ordersStatus.confirmed}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-600)"
    //           trend="rise"
    //         />
    //         <Card
    //           title="Completed"
    //           value={ordersStatus.completed}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-700)"
    //           trend="rise"
    //         />
    //         <Card
    //           title="Canceled"
    //           value={ordersStatus.canceled}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-800)"
    //           trend="decline"
    //         />
    //         <Card
    //           title="Refunded"
    //           value={ordersStatus.refunded}
    //           total={ordersStatus.totalorders}
    //           barColor="var(--primary-900)"
    //           trend="decline"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </DateWrapper>
  );
};

export default OrdersStatusSummary;

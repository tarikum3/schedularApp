"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";
import { CustomersOverMonthsSkeleton } from "@/app/components/admin/components/dashboard/Overview/Skeletons";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const CustomersOverMonths = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const { data: newCustomersData, isLoading } = useGetOverviewsQuery(
    {
      type: "newCustomers",
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    },
    { skip: !dateRange.startDate }
  );

  const onTableDateRangeChange = useCallback(
    (value: { startDate: string; endDate: string }) => {
      setDateRange(value);
    },
    []
  );

  const newCustomers = useMemo(() => {
    return (newCustomersData?.data || []).map((data: any) => ({
      category: data.month,
      Customers: data.new_customers ?? 0,
    }));
  }, [newCustomersData]);

  if (isLoading) {
    return <CustomersOverMonthsSkeleton />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-4 md:mb-0">
          New Customers
        </h2>
        <DateWrapper
          type="year"
          onTableDateRangeChange={onTableDateRangeChange}
        />
      </div>

      {/* Chart Section */}
      <div className="w-full h-[450px]">
        <GenericAreaChart
          data={newCustomers}
          colors={colors}
          height={450}
          grid
          smooth
        />
      </div>
    </div>
  );
};

export default CustomersOverMonths;

// "use client";
// import React, { useEffect, useState, useMemo, useCallback } from "react";

// import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
// import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
// import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

// const colors = ["#8884d8", "#82ca9d", "#ffc658"];

// const CustomersOverMonths = () => {
//   const [dateRange, setDateRange] = useState<any>({
//     startDate: "",
//     endDate: "",
//   });
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [newCustomers, setNewCustomers] = useState<any>([]);
//   const { data: newCustomersData } = useGetOverviewsQuery(
//     {
//       type: "newCustomers",
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
//   console.log("newCustomersData", newCustomersData?.data);
//   useEffect(() => {
//     let newCustomers = (newCustomersData as any)?.data;
//     if (newCustomers?.length >= 0) {
//       setNewCustomers([
//         ...newCustomers.map((data: any) => {
//           return {
//             category: data.month,
//             Customers: data.new_customers ?? 0,
//           };
//         }),
//       ]);
//     }
//   }, [newCustomersData]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold text-primary-900 mb-4 md:mb-0">
//           New Customers
//         </h2>
//         <DateWrapper
//           type="year"
//           onTableDateRangeChange={onTableDateRangeChange}
//         />
//       </div>

//       {/* Chart Section */}
//       <div className="w-full h-[450px]">
//         <GenericAreaChart
//           data={newCustomers}
//           colors={colors}
//           height={450}
//           grid
//           smooth
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomersOverMonths;

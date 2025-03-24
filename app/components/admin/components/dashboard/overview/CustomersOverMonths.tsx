// "use client";
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
// import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
// import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

// const colors = ["#8884d8", "#82ca9d", "#ffc658"];

// const CustomersOverMonths = () => {
//   const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
//   const { data: newCustomersData, isLoading } = useGetOverviewsQuery(
//     {
//       type: "newCustomers",
//       fromDate: dateRange.startDate,
//       toDate: dateRange.endDate,
//     },
//     { skip: !dateRange.startDate }
//   );

//   const onTableDateRangeChange = useCallback(
//     (value: { startDate: string; endDate: string }) => {
//       setDateRange(value);
//     },
//     []
//   );

//   const newCustomers = useMemo(() => {
//     return (
//       newCustomersData?.data || [
//         { month: "feb", new_customers: 5 },
//         { month: "mar", new_customers: 4 },
//         { month: "apr", new_customers: 4 },
//       ]
//     ).map((data: any) => ({
//       category: data.month,
//       Customers: data.new_customers ?? 0,
//     }));
//   }, [newCustomersData]);

//   return (
//     <div className="bg-primary-0  text-primary-900 border p-8   mx-auto  rounded-lg shadow-sm w-full max-w-5xl">
//       <h2 className="text-xl font-semibold text-left mb-8 pl-9 ">
//         New Customers
//       </h2>

//       {/* Chart Section */}
//       <div className="flex flex-col gap-4 ">
//         <div className=" ml-auto">
//           <DateWrapper
//             type="year"
//             onTableDateRangeChange={onTableDateRangeChange}
//           />
//         </div>
//         <GenericAreaChart
//           data={newCustomers}
//           // colors={colors}
//           // height={450}
//           // grid
//           smooth
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomersOverMonths;

"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

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
    return (
      // newCustomersData?.data ||
      [
        { month: "feb", new_customers: 5 },
        { month: "mar", new_customers: 4 },
        { month: "apr", new_customers: 4 },
        { month: "mars", new_customers: 5 },
        { month: "aprs", new_customers: 8 },
        { month: "mar", new_customers: 4 },
        { month: "aprdd", new_customers: 4 },
      ]
        // || [
        //   { month: "feb", new_customers: 5 },
        //   { month: "mar", new_customers: 4 },
        //   { month: "apr", new_customers: 4 },
        // ]
        .map((data: any) => ({
          category: data.month,
          Customers: data.new_customers ?? 0,
        }))
    );
  }, [newCustomersData]);

  return (
    <div className="bg-primary-0 text-primary-900  p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl font-bold text-primary-900">
          New Customers Over Months
        </h2>
        <div className="ml-auto">
          <DateWrapper
            type="year"
            onTableDateRangeChange={onTableDateRangeChange}
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col gap-4 h-64  w-full max-w-5xl p-1">
        <GenericAreaChart data={newCustomers} height={250} smooth grid />
      </div>

      {/* Loading State */}
      {/* {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )} */}
    </div>
  );
};

export default CustomersOverMonths;

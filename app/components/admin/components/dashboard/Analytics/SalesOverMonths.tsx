"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetAnalyticsQuery } from "@lib/admin/store/services/dashboard/analytics.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const SalesOverMonths = () => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: "",
    endDate: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState<any>([]);
  const { data: monthlySalesRevenueData } = useGetAnalyticsQuery(
    {
      type: "MonthlySalesRevenue",
      fromDate: dateRange?.startDate,
      toDate: dateRange?.endDate,
    },
    { skip: !dateRange?.startDate }
  );

  const onTableDateRangeChange = useCallback(
    (value: any) => {
      setDateRange(value);
    },
    [dateRange]
  );
  console.log("monthlySalesRevenueData", monthlySalesRevenueData?.data);
  useEffect(() => {
    let monthlySalesRevenue = (monthlySalesRevenueData as any)?.data;
    if (monthlySalesRevenue?.length >= 0) {
      setMonthlySalesRevenue([
        ...monthlySalesRevenue.map((data: any) => {
          return {
            category: data.month,
            sales: data.total_revenue ?? 0,
          };
        }),
      ]);
    }
  }, [monthlySalesRevenueData]);

  return (
    <>
      <div className="bg-primary-0 text-primary-900 border p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900">
            Sales over Months
          </h2>
          <div className="ml-auto">
            <DateWrapper
              type="year"
              onTableDateRangeChange={onTableDateRangeChange}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex flex-col gap-4">
          <GenericAreaChart
            data={monthlySalesRevenue}
            height={400}
            smooth
            grid
          />
        </div>
      </div>
    </>
  );
};

export default SalesOverMonths;

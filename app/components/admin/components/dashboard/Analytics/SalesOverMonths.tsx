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
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              Sales over Months
            </h2>
            <GenericAreaChart
              data={monthlySalesRevenue}
              colors={colors}
              height={450}
              grid
              smooth
            />
          </div>
        </div>
      </DateWrapper>
    </>
  );
};

export default SalesOverMonths;

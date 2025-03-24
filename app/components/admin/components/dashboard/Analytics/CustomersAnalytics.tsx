"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import PieChartFullCircle from "@/app/components/admin/components/dashboard/charts/PieChartFullCircle";
import { useGetAnalyticsQuery } from "@lib/admin/store/services/dashboard/analytics.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const CustomersAnalytics = () => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: "",
    endDate: "",
  });

  const [firstreturning, setFirstreturning] = useState([
    { value: 0, name: "firstTime", color: "#8884d8" },
    { value: 0, name: "returning", color: "#82ca9d" },
  ]);
  const [vipregular, setVipregular] = useState([
    { value: 0, name: "vip", color: "#8884d8" },
    { value: 0, name: "regular", color: "#82ca9d" },
  ]);
  const { data: CustomersAnalyticsData } = useGetAnalyticsQuery(
    {
      type: "CustomersAnalytics",
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
  console.log("newCustomersAnalyticsData", CustomersAnalyticsData?.data);
  useEffect(() => {
    let CustomersAnalytics = (CustomersAnalyticsData as any)?.data;
    if (CustomersAnalytics) {
    }
  }, [CustomersAnalyticsData]);

  return (
    <>
      <div className="bg-primary-0 text-primary-900 border p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900">
            Customers Analytics
          </h2>
          <div className="ml-auto">
            <DateWrapper
              type="year"
              onTableDateRangeChange={onTableDateRangeChange}
            />
          </div>
        </div>

        <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
          <PieChartFullCircle data={firstreturning} />
        </div>

        {/* Loading State */}
      </div>
    </>
  );
};

export default CustomersAnalytics;

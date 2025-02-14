"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";
const sampleData = [
  { category: "Jan", sales: 4000, revenue: 2400, profit: 2000 },
  { category: "Feb", sales: 3000, revenue: 1398, profit: 1800 },
  { category: "Mar", sales: 5000, revenue: 9800, profit: 2900 },
  { category: "Apr", sales: 4780, revenue: 3908, profit: 2500 },
  { category: "May", sales: 5890, revenue: 4800, profit: 3200 },
  { category: "Jun", sales: 6390, revenue: 5800, profit: 4000 },
  { category: "Jul", sales: 7490, revenue: 6700, profit: 4500 },
];

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const CustomersOverMonths = () => {
  const [dateRange, setDateRange] = useState<any>({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [newCustomers, setNewCustomers] = useState<any>([]);
  const { data: newCustomersData } = useGetOverviewsQuery({
    type: "newCustomers",
    fromDate,
    toDate,
  });

  const onTableDateRangeChange = useCallback(
    (value: any) => {
      setDateRange(value);
    },
    [dateRange]
  );
  console.log("newCustomersData", newCustomersData);
  useEffect(() => {
    let monthStatus = (newCustomersData as any)?.summary?.monthStatus;
    if (monthStatus?.length >= 0) {
      setNewCustomers([
        ...monthStatus.map((month: any) => {
          return {
            category: month.name,
            closed: month.closed ?? 0,
            pending: month.pending ?? 0,
            escalated: month.escalated ?? 0,
          };
        }),
      ]);
    }
  }, [newCustomersData]);

  return (
    <>
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              Sales Performance
            </h2>
            <GenericAreaChart
              data={sampleData}
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

export default CustomersOverMonths;

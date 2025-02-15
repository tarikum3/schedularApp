"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const OrdersOverMonths = () => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: "",
    endDate: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [newOrders, setNewOrders] = useState<any>([]);
  const { data: newOrdersData } = useGetOverviewsQuery(
    {
      type: "newOrders",
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
  console.log("newOrdersData", newOrdersData?.data);
  useEffect(() => {
    let newOrders = (newOrdersData as any)?.data;
    if (newOrders?.length >= 0) {
      setNewOrders([
        { category: "Mar", Orders: 9 },
        ...newOrders.map((data: any) => {
          return {
            category: data.month,
            Orders: data.new_orders ?? 0,
          };
        }),
      ]);
    }
  }, [newOrdersData]);

  return (
    <>
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              New Orders
            </h2>
            <GenericAreaChart
              data={newOrders}
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

export default OrdersOverMonths;

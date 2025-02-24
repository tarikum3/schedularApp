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
      <div className="bg-white text-primary-900 border p-8 mx-auto rounded-lg shadow-sm w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary-900">New Orders</h2>
          <div className="ml-auto">
            <DateWrapper
              type="year"
              onTableDateRangeChange={onTableDateRangeChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <GenericAreaChart data={newOrders} height={400} smooth grid />
        </div>
      </div>
    </>
  );
};

export default OrdersOverMonths;

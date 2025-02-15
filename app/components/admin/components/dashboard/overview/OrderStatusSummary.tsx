"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import Card from "@/app/components/admin/components/dashboard/elements/Card";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const OrdersStatusSummary = () => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: "",
    endDate: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
//   PENDING
//   CONFIRMED
//   COMPLETED
//   CANCELED
//   REFUNDED
  const [ordersStatus, setOrdersStatus] = useState<any>({totalorders:0,pending:0,
    confirmed:0,completed:0,canceled:0,refunded:0});
  const { data: OrdersStatusData } = useGetOverviewsQuery(
    {
      type: "OrdersStatus",
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
  console.log("newOrdersData", OrdersStatusData?.data);
  useEffect(() => {
    let OrdersStatus = (OrdersStatusData as any)?.data;
    if (OrdersStatus) {
      setOrdersStatus({

        totalorders:OrdersStatus.totalorders,pending:OrdersStatus.pending,
            confirmed:OrdersStatus.confirmed,completed:OrdersStatus.completed,canceled:OrdersStatus.canceled
            ,refunded:OrdersStatus.refunded}
      
      );
    }
  }, [OrdersStatusData]);

  return (
    <>
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">
            Orders Status Summary
            </h2>
            <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
            <Card
      title="Total Orders"
      
 value={ordersStatus.totalorders}

    />
              <Card
      title="Pending"
      
 value={ordersStatus.pending}

    />
    //   CONFIRMED
//   COMPLETED
//   CANCELED
//   REFUNDED
                  <Card
      title="Confirmed"
      
 value={ordersStatus.Confirmed}

    />
                    <Card
      title="Completed"
      
 value={ordersStatus.completed}

    />
                      <Card
      title="Canceled"
      
 value={ordersStatus.canceled}

    />                  <Card
    title="Refunded"
    
value={ordersStatus.refunded}

  />
          </div>
          </div>
        </div>
      </DateWrapper>
    </>
  );
};

export default OrdersStatusSummary;

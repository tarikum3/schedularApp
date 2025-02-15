"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";

import GenericAreaChart from "@/app/components/admin/components/dashboard/charts/GenericAreachart";
import { useGetOverviewsQuery } from "@lib/admin/store/services/dashboard/overview.service";
import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const CustomersOverMonths = () => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: "",
    endDate: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [newCustomers, setNewCustomers] = useState<any>([]);
  const { data: newCustomersData } = useGetOverviewsQuery(
    {
      type: "newCustomers",
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
  console.log("newCustomersData", newCustomersData?.data);
  useEffect(() => {
    let newCustomers = (newCustomersData as any)?.data;
    if (newCustomers?.length >= 0) {
      setNewCustomers([
        ...newCustomers.map((data: any) => {
          return {
            category: data.month,
            Customers: data.new_customers ?? 0,
          };
        }),
      ]);
    }
  }, [newCustomersData]);
  // useEffect(() => {
  //   if (dateRange?.startDate && dateRange.endDate) {
  //     setToDate(dateRange?.endDate)
  //         setFromDate(dateRange?.startDate)

  //         }else{
  //           setToDate("")
  //           setFromDate("")

  //         }
  //         setFromDatePrev(dateRange?.startDatePrev)
  //         setToDatePrev(dateRange?.endDatePrev)
  // }, [dateRange]);

  return (
    <>
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              New Customers
            </h2>
            <GenericAreaChart
              data={newCustomers}
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

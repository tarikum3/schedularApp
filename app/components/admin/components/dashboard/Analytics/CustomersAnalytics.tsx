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


  const [firstreturning, setFirstreturning] = useState([{value:0,name:"firstTime",
    color:"#8884d8"},{value:0,name:"returning",
      color:"#82ca9d"}]);
      const [vipregular, setVipregular] = useState([{value:0,name:"vip",
        color:"#8884d8"},{value:0,name:"regular",
          color:"#82ca9d"}]);
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
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        <div className="p-6 bg-primary-100 min-h-screen flex justify-center items-center">
          <div className="w-full max-w-3xl">
            {/* <h2 className="text-xl font-semibold text-center mb-4">
            Orders Status Summary
            </h2> */}
            <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
 
   

  <PieChartFullCircle data={firstreturning}/>


          </div>
          </div>
        </div>
      </DateWrapper>
    </>
  );
};

export default CustomersAnalytics;
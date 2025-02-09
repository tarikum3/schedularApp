"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";

import Card from "@/app/components/admin/components/dashboard/elements/Card";

import { useGetCustomerExpDashboardDataNewQuery } from "services/dashboard.service";

import DateWrapper from "@/app/components/admin/components/dashboard/elements/DateWrapper";

export const ProductCards: React.FC = () => {
  const [dateRange, setDateRange] = useState<any>({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDatePrev, setFromDatePrev] = useState("");
  const [toDatePrev, setToDatePrev] = useState("");

  const { data: CustomerExpDashboardDat } =
    useGetCustomerExpDashboardDataNewQuery({ fromDate, toDate });

  const { data: CustomerExpDashboardDatPrev } =
    useGetCustomerExpDashboardDataNewQuery({
      fromDate: fromDatePrev,
      toDate: toDatePrev,
    });

  const onTableDateRangeChange = (value: any) => {
    setDateRange(value);
  };

  useEffect(() => {
    if (dateRange?.startDate && dateRange.endDate) {
      setToDate(dateRange?.endDate);
      setFromDate(dateRange?.startDate);

      // setFromDatePrev(dateFormatDays(subYears(new Date(dateRange?.startDate),1), "YYYY-MM-DD"))
      //  setToDatePrev(dateFormatDays(subYears(new Date(dateRange?.endDate),1), "YYYY-MM-DD"))
    } else {
      setToDate("");
      setFromDate("");
      // setFromDatePrev(dateFormatDays(subYears(new Date(dateRange?.startDate),1), "YYYY-MM-DD"))
      // setToDatePrev(dateFormatDays(subYears(new Date(dateRange?.endDate),1), "YYYY-MM-DD"))
    }
    setFromDatePrev(dateRange?.startDatePrev);
    setToDatePrev(dateRange?.endDatePrev);
  }, [dateRange]);
  //console.log("CustomerExpProductData",CustomerExpProductData)

  return (
    <>
      <DateWrapper type="year" onTableDateRangeChange={onTableDateRangeChange}>
        {/* <Link to={"/ProductReport"} reloadDocument> */}
        <div className="w-full mt-6  grid grid-cols-2 gap-3 justify-items-center   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2">
          <div
            onClick={() => {
              // setCstatus("");
              setModalOpen(true);
              setDataFor("cardAll");
            }}
          >
            <Card
              title="Total Product"
              value={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  .totalCount ?? 0
              }
              trend={
                (CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.totalCount || 0) >=
                (CustomerExpDashboardDatPrev?.ProductSummary?.allProductsStatus
                  ?.totalCount || 0)
                  ? "rise"
                  : "decline"
              }
            />
          </div>
          <div
            onClick={() => {
              //setCstatus("pending");
              // setModalOpen(true);
              setModalOpen(true);
              setDataFor("cardpending");
            }}
          >
            <Card
              title=" Product Pending"
              value={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  .status.pending ?? 0
              }
              total={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  .totalCount ?? 0
              }
              //  trend="rise"
              trend={
                (CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.status.pending || 0) >=
                (CustomerExpDashboardDatPrev?.ProductSummary?.allProductsStatus
                  ?.status.pending || 0)
                  ? "rise"
                  : "decline"
              }
              barColor="#84CC16"
            />
          </div>
          <div
            onClick={() => {
              //setCstatus("closed");
              // setModalOpen(true);
              setModalOpen(true);
              setDataFor("cardCLOSED");
            }}
          >
            <Card
              title="Product Resolved"
              // value={(allProductsStatus?.status?.resolved||allProductsStatus?.status?.closed) ?? 0}
              value={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.status?.closed ?? 0
              }
              total={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  .totalCount ?? 0
              }
              // trend="rise"
              trend={
                (CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.status.closed || 0) >=
                (CustomerExpDashboardDatPrev?.ProductSummary?.allProductsStatus
                  ?.status.closed || 0)
                  ? "rise"
                  : "decline"
              }
              barColor="#243c5a"
            />
          </div>
          <div
            onClick={() => {
              setCstatus("escalated");
              //setModalOpen(true);
              setModalOpen(true);
              setDataFor("cardESCALATED");
            }}
          >
            <Card
              title=" Product Escalated"
              value={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.status?.escalated ?? 0
              }
              total={
                CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  .totalCount ?? 0
              }
              // trend="rise"
              trend={
                (CustomerExpDashboardDat?.ProductSummary?.allProductsStatus
                  ?.status.escalated || 0) >=
                (CustomerExpDashboardDatPrev?.ProductSummary?.allProductsStatus
                  ?.status.escalated || 0)
                  ? "rise"
                  : "decline"
              }
              barColor="#abd2cf"
            />
          </div>
          {/* <Card
        title="Product with claim"
   
        value={(CustomerExpDashboardDat?.ProductSummary?.allProductsStatus?.status?.transferred) ?? 0}
        total={CustomerExpDashboardDat?.ProductSummary?.allProductsStatus.totalCount ?? 0}
        trend="rise"
        barColor="#C026D3"
      /> */}
        </div>
        {/* </Link> */}
      </DateWrapper>
    </>
  );
};

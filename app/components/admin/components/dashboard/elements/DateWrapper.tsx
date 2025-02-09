"use client";
import React, { useState, useEffect, useCallback, ReactNode } from "react";

import DateRangeComponent, {
  DateRangeValue,
} from "@/app/components/admin/components/ui/CustomDateRange";
import { Typography } from "@material-ui/core";

import { endOfYear, startOfYear, subYears } from "date-fns";
import { dateFormatDays } from "@/lib/admin/utils/dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
interface CustomTableProps {
  onTableDateRangeChange?: (...args: any) => any;

  title?: string;
  children?: ReactNode;
  type?: "year" | "dateRange";
}

const DateWrapper: React.FC<CustomTableProps> = ({
  children,
  onTableDateRangeChange,
  title,
  type,
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [dateRange, setDateRange] = useState<any>({});

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDatePrev, setFromDatePrev] = useState("");
  const [toDatePrev, setToDatePrev] = useState("");

  const handleYearChange = (newValue: unknown) => {
    if (newValue instanceof Date) {
      setSelectedYear(newValue.getFullYear());
    }
  };

  const handleOnDateRangeToggle = useCallback((value?: boolean) => {
    setDateRangeModal(value ?? false);
  }, []);

  const handleDateRangeChange = useCallback((value: DateRangeValue) => {
    setDateRange(value);
  }, []);

  useEffect(() => {
    if (type != "year" && dateRange?.startDate && dateRange?.endDate) {
      setToDate(dateRange?.endDate);
      setFromDate(dateRange?.startDate);
      setFromDatePrev(
        dateFormatDays(
          subYears(new Date(dateRange?.startDate), 1),
          "YYYY-MM-DD"
        )
      );
      setToDatePrev(
        dateFormatDays(subYears(new Date(dateRange?.endDate), 1), "YYYY-MM-DD")
      );
    } else {
      setToDate("");
      setFromDate("");
      setFromDatePrev(
        dateFormatDays(startOfYear(subYears(new Date(), 1)), "YYYY-MM-DD")
      );
      setToDatePrev(
        dateFormatDays(endOfYear(subYears(new Date(), 1)), "YYYY-MM-DD")
      );
    }
  }, [dateRange]);
  useEffect(() => {
    if (type && type == "year" && selectedYear) {
      const yearStart = startOfYear(new Date(selectedYear, 0, 1));
      const yearEnd = endOfYear(new Date(selectedYear, 0, 1));

      setFromDate(dateFormatDays(yearStart, "YYYY-MM-DD"));
      setToDate(dateFormatDays(yearEnd, "YYYY-MM-DD"));

      setFromDatePrev(
        dateFormatDays(
          startOfYear(new Date(selectedYear - 1, 0, 1)),
          "YYYY-MM-DD"
        )
      );
      setToDatePrev(
        dateFormatDays(
          endOfYear(new Date(selectedYear - 1, 0, 1)),
          "YYYY-MM-DD"
        )
      );
    }
  }, [selectedYear]);

  useEffect(() => {
    if (onTableDateRangeChange) {
      onTableDateRangeChange({
        startDate: fromDate,
        endDate: toDate,
        startDatePrev: fromDatePrev,
        endDatePrev: toDatePrev,
      });
    }
  }, [toDate, fromDate, toDatePrev, fromDatePrev]);

  return (
    <>
      <div className="  h-full w-full">
        <Typography
          variant="h6"
          className="text-xl text-primary font-bold mb-4"
        >
          {" "}
          {title}
        </Typography>

        {type == "year" ? (
          <div className="relative  bg-white text-[#2C2E7B]  w-full max-w-[200px] ml-auto rounded-[3px] text-md border border-gray-300 ">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                label="Select Year"
                value={new Date(selectedYear, 0)}
                onChange={handleYearChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>
        ) : (
          <DateRangeComponent
            open={dateRangeModal}
            onChange={handleDateRangeChange}
            toggle={handleOnDateRangeToggle}
          />
        )}
        {children}
      </div>
    </>
  );
};

export default DateWrapper;

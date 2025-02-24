"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import { Typography } from "@material-ui/core";
// import { endOfYear, startOfYear, subYears } from "date-fns";
import {
  dateFormatDays,
  endOfYear,
  startOfYear,
  subYears,
} from "@/lib/admin/utils/dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { SxProps } from "@mui/system";
const DateRangeComponent = dynamic(
  () => import("@/app/components/admin/components/ui/CustomDateRange"),
  {
    ssr: false,
  }
);
const inputStyles: SxProps = {
  "& .MuiOutlinedInput-root": {
    color: "red",
  },
  "& .MuiInputLabel-root": {
    top: -3, // adjust the label position if needed
    color: "red",
  },
};
interface CustomTableProps {
  onTableDateRangeChange?: (dateRange: {
    startDate: string;
    endDate: string;
    startDatePrev: string;
    endDatePrev: string;
  }) => void;
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
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});

  const handleYearChange = (newValue: unknown) => {
    if (newValue instanceof Date) {
      setSelectedYear(newValue.getFullYear());
    }
  };

  const handleOnDateRangeToggle = useCallback((value?: boolean) => {
    setDateRangeModal(value ?? false);
  }, []);

  const handleDateRangeChange = useCallback(
    (value: { startDate?: Date; endDate?: Date }) => {
      setDateRange(value);
    },
    []
  );

  const dateRangeValues = useMemo(() => {
    if (type !== "year" && dateRange.startDate && dateRange.endDate) {
      return {
        startDate: dateFormatDays(dateRange.startDate, "YYYY-MM-DD"),
        endDate: dateFormatDays(dateRange.endDate, "YYYY-MM-DD"),
        startDatePrev: dateFormatDays(
          subYears(dateRange.startDate, 1),
          "YYYY-MM-DD"
        ),
        endDatePrev: dateFormatDays(
          subYears(dateRange.endDate, 1),
          "YYYY-MM-DD"
        ),
      };
    } else if (type === "year" && selectedYear) {
      const yearStart = startOfYear(new Date(selectedYear, 0, 1));
      const yearEnd = endOfYear(new Date(selectedYear, 0, 1));
      return {
        startDate: dateFormatDays(yearStart, "YYYY-MM-DD"),
        endDate: dateFormatDays(yearEnd, "YYYY-MM-DD"),
        startDatePrev: dateFormatDays(
          startOfYear(new Date(selectedYear - 1, 0, 1)),
          "YYYY-MM-DD"
        ),
        endDatePrev: dateFormatDays(
          endOfYear(new Date(selectedYear - 1, 0, 1)),
          "YYYY-MM-DD"
        ),
      };
    }
    return {
      startDate: "",
      endDate: "",
      startDatePrev: dateFormatDays(
        startOfYear(subYears(new Date(), 1)),
        "YYYY-MM-DD"
      ),
      endDatePrev: dateFormatDays(
        endOfYear(subYears(new Date(), 1)),
        "YYYY-MM-DD"
      ),
    };
  }, [dateRange, selectedYear, type]);

  useEffect(() => {
    if (onTableDateRangeChange) {
      onTableDateRangeChange(dateRangeValues);
    }
  }, [dateRangeValues, onTableDateRangeChange]);

  return (
    <div className="w-full max-w-48 ">
      <Typography
        variant="h6"
        className="text-xl text-primary-700 font-bold mb-4"
      >
        {title}
      </Typography>
      {type === "year" ? (
        <div className="relative bg-white text-primary-700 w-full max-w-48 ml-auto ">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label="Select Year"
              value={new Date(selectedYear, 0)}
              onChange={handleYearChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // sx={inputStyles}
                  fullWidth
                />
              )}
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
  );
};

export default React.memo(DateWrapper);

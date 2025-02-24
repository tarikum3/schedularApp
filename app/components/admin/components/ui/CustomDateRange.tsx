"use client";
import React, { useCallback, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { DateRangePicker } from "materialui-daterange-picker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { dateFormatDays } from "@/lib/admin/utils/dayjs";
import CloseIcon from "@mui/icons-material/Close";

export interface DateRangeValue {
  startDate: string;
  endDate: string;
}

export interface DateRangeValueDate {
  startDate: Date;
  endDate: Date;
}

interface Props {
  open: boolean;
  onChange: (range: DateRangeValue | any) => void;
  toggle: (value?: boolean) => void;
  label?: string;
}

const CustomDateRangeComponent = ({ open, onChange, toggle, label }: Props) => {
  const [dateRange, setDateRange] = React.useState<DateRangeValueDate | any>(
    {}
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      onChange({
        startDate: dateFormatDays(dateRange.startDate, "YYYY-MM-DD"),
        endDate: dateFormatDays(dateRange.endDate, "YYYY-MM-DD"),
      });
    }
  }, [dateRange]);

  const handleClear = useCallback(() => {
    setDateRange({});
    onChange({});
  }, []);

  return (
    <div className="">
      <div className="relative flex items-end  bg-white text-primary-700 w-full max-w-[200px] ml-auto rounded-[3px] text-md border border-gray-300 ">
        <div onClick={() => toggle(true)}>
          <div className="absolute w-7 h-7 inset-y-2 left-0 pl-3">
            <CalendarMonthIcon />
          </div>
          <input
            //  className="ml-auto mr-4 min-w-[180px] text-sm w-full bg-white text-[#2C2E7B] max-w-[600px] pl-10 py-[12px] rounded-sm text-md outline-none focus:ring-[1px]"
            className="ml-auto mr-4 text-sm w-full max-w-[600px] pl-10 py-[12px] rounded-sm text-md outline-none focus:ring-[1px] overflow-hidden text-ellipsis whitespace-nowrap"
            value={`${
              dateRange?.startDate
                ? dateFormatDays(dateRange?.startDate)
                : label
                ? label
                : "From"
            }  ${dateRange?.endDate ? "-" : label ? " " : "-"} ${
              dateRange?.endDate
                ? dateFormatDays(dateRange.endDate)
                : label
                ? ""
                : "To"
            }`}
          />
        </div>
        {(dateRange?.startDate || dateRange?.endDate) && (
          <div className="w-full h-full flex-1 py-[7px] pr-2 bg-">
            <IconButton size="small" onClick={handleClear}>
              <CloseIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton>
          </div>
        )}
      </div>
      <div
        className={`${
          open ? "fixed" : "hidden"
        } top-0 left-0 w-full h-full flex items-center justify-center bg-[#0002] backdrop-blur-sm z-[9999]`}
      >
        {/* <div className="bg-white pt-10 pb-6 px-10 rounded-lg"> */}
        <DateRangePicker
          open={open}
          toggle={toggle}
          closeOnClickOutside={true}
          maxDate={new Date()}
          wrapperClassName="shadow-none-date-range"
          value={dateRange}
          onChange={(range: any) => setDateRange(range)}
        />
      </div>
    </div>
  );
};

export default CustomDateRangeComponent;

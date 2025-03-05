"use client";
import React, { useEffect, useMemo, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { CalendarProvider, useCalendar } from "./CalendarContext";
import Month from "@/app/components/schedular/components/Calendar/Month";

const Calendar: React.FC = () => {
  const {
    currentMonth,
    selectedDate,
    selectOptionValue,
    setSelectedDate,
    setSelectOptionValue,
    nextMonth,
    prevMonth,
  } = useCalendar();
  const { data } = useGetDayByYearQuery(format(new Date(), "yyyy"));
  const { data: scheduledata } = useGetAllSchedulesQuery();
  const [mappedData, setMappedData] = useState<any>();

  const generateYears = (startYear: number, endYear: number): string[] => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(format(new Date(year, 0, 1), "yyyy"));
    }
    return years;
  };

  const years = generateYears(2022, 2100);

  useEffect(() => {
    if ((data as any)?.length && (data as any)?.length > 0) {
      let mapped: any = {};
      (data as any).forEach((element: any) => {
        let mapitem = format(new Date(element.date), "yyyy-MM-dd");
        mapped[mapitem] = element;
      });
      setMappedData(mapped);
    }
  }, [data]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
        <button
          className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={prevMonth}
        >
          {"<"}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">
            {format(currentMonth, "MMMM")}
          </span>
          <select
            value={selectOptionValue}
            onChange={(e) => setSelectOptionValue(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={nextMonth}
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-semibold text-gray-600 py-2" key={i}>
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-md">
        {renderHeader()}
        {renderDays()}
        <Month
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={(day) => setSelectedDate(day)}
          mappedData={mappedData}
        />
      </div>
    </div>
  );
};

export default function CalendarWrraper() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

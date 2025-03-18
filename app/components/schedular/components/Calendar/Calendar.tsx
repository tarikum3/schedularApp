"use client";

import React, { useEffect, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { CalendarProvider, useCalendar } from "./CalendarContext";
import Month from "@/app/components/schedular/components/Calendar/Month";
import { useTranslations } from "next-intl";

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
  const [mappedData, setMappedData] = useState<Record<string, any>>();
  const t = useTranslations("Calendar"); // Use translations for this component

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
      const mapped: Record<string, any> = {};
      (data as any).forEach((element: any) => {
        const mapitem = format(new Date(element.date), "yyyy-MM-dd");
        mapped[mapitem] = element;
      });
      setMappedData(mapped);
    }
  }, [data]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-4">
        <button
          className="text-xl px-2 py-1 bg-primary-50 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          onClick={prevMonth}
          aria-label={t("previousMonth")}
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
            className="p-2 border rounded-md bg-primary-50 text-primary-700 focus:ring-2 focus:ring-primary-400"
            aria-label={t("selectYear")}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-xl px-2 py-1 bg-primary-50 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          onClick={nextMonth}
          aria-label={t("nextMonth")}
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
        <div
          className="text-center font-semibold text-primary-600 py-2"
          key={i}
        >
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="w-full  bg-primary-0 px-4 ">
        {renderHeader()}
        {renderDays()}
        <Month
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={(day) => setSelectedDate(day)}
          mappedData={mappedData || {}}
        />
      </div>
    </div>
  );
};

export default function CalendarWrapper() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

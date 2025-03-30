"use client";
import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
} from "date-fns";
import Day from "@/app/components/schedular/components/Calendar/Day";

interface MonthProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  mappedData: any;
}

const Month: React.FC<MonthProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
  mappedData,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  console.log("mappedmonth", mappedData);
  return (
    <div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const stringday = format(new Date(day), "yyyy-MM-dd");
          const mappeday = mappedData ? mappedData[stringday] ?? {} : {};
          return (
            <Day
              key={day.toString()}
              day={day}
              monthStart={monthStart}
              selectedDate={selectedDate}
              onDateClick={onDateClick}
              mappedData={mappedData}
              schedules={mappeday.schedules ?? []}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;

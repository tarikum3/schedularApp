"use client";
import React from "react";
import { format, isSameMonth, isSameDay } from "date-fns";

interface DayProps {
  day: Date;
  monthStart: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  mappedData: any;
}

const Day: React.FC<DayProps> = ({
  day,
  monthStart,
  selectedDate,
  onDateClick,
  mappedData,
}) => {
  const formattedDate = format(day, "d");
  const formattedFullDate = format(day, "yyyy-MM-dd");

  return (
    <div
      className={`p-4 text-center border cursor-pointer transition-all duration-200 ${
        !isSameMonth(day, monthStart)
          ? "text-gray-300"
          : isSameDay(day, selectedDate)
          ? "bg-blue-500 text-white font-bold"
          : "hover:bg-gray-200"
      }`}
      onClick={() => onDateClick(day)}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium">
          {mappedData && mappedData[formattedFullDate]
            ? mappedData[formattedFullDate].isWorkingDay
              ? "Open"
              : "Closed"
            : "N/A"}
        </span>
        <span className="text-lg font-semibold">{formattedDate}</span>
      </div>
    </div>
  );
};

export default Day;

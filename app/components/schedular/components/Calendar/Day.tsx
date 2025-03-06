"use client";
import React, { useMemo } from "react";
import { format, isSameMonth, isSameDay } from "date-fns";

interface Schedule {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  scheduleType: "MEETING" | "APPOINTMENT" | "PERSONAL";
}

interface DayProps {
  day: Date;
  monthStart: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  mappedData: Record<string, { isWorkingDay: boolean }>;
  schedules?: Schedule[]; // Optional array of schedules
}

const Day: React.FC<DayProps> = ({
  day,
  monthStart,
  selectedDate,
  onDateClick,
  mappedData,
  schedules = [],
}) => {
  const formattedDate = format(day, "d");
  const formattedFullDate = format(day, "yyyy-MM-dd");

  const scheduleTypesPresent = useMemo(() => {
    return Array.from(
      new Set(schedules.map((schedule) => schedule.scheduleType))
    );
  }, [schedules]);

  // Define colors for each ScheduleType
  const scheduleTypeColors = {
    MEETING: "bg-blue-500",
    APPOINTMENT: "bg-green-500",
    PERSONAL: "bg-yellow-500",
  };

  // Determine if the day is in the current month
  const isCurrentMonth = isSameMonth(day, monthStart);

  // Determine if the day is the selected date
  const isSelectedDay = isSameDay(day, selectedDate);

  // Handle click event
  const handleClick = () => {
    onDateClick(day);
  };

  return (
    <div
      className={`p-4 text-center border cursor-pointer transition-all duration-200 ${
        !isCurrentMonth
          ? "text-gray-300"
          : isSelectedDay
          ? "bg-blue-500 text-white font-bold"
          : "hover:bg-gray-200"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium">
          {/* {mappedData && mappedData[formattedFullDate]
            ? mappedData[formattedFullDate].isWorkingDay
              ? "Open"
              : "Closed"
            : "N/A"} */}
        </span>
        <span className="text-lg font-semibold">{formattedDate}</span>
        <div className="flex -space-x-2.5 mt-1 justify-end">
          {scheduleTypesPresent.map((type, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full ${scheduleTypeColors[type]}`}
              title={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day;

// const schedules = [
//   {
//     id: "1",
//     name: "Team Meeting",
//     startDate: new Date(),
//     endDate: new Date(),
//     scheduleType: "MEETING",
//   },
//   {
//     id: "2",
//     name: "Doctor Appointment",
//     startDate: new Date(),
//     endDate: new Date(),
//     scheduleType: "APPOINTMENT",
//   },
// ];

// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   addMonths,
//   subMonths,
//   addDays,
//   parse,
//   setYear,
//   getYear,
//   parseISO,
// } from "date-fns";

// import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
// import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";

// const Calendar: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [selectOptionValue, setSelectOptionValue] = useState(
//     format(new Date(), "yyyy")
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalOpenCal, setModalOpenCal] = useState(false);
//   const { data } = useGetDayByYearQuery(format(new Date(), "yyyy"));
//   const { data: scheduledata } = useGetAllSchedulesQuery();
//   const [mappedData, setMappedData] = useState<any>();

//   const generateYears = (startYear: number, endYear: number): string[] => {
//     const years = [];
//     for (let year = startYear; year <= endYear; year++) {
//       years.push(format(new Date(year, 0, 1), "yyyy"));
//     }
//     return years;
//   };

//   const years = generateYears(2022, 2100);

//   useEffect(() => {
//     if ((data as any)?.length && (data as any)?.length > 0) {
//       let mapped: any = {};
//       (data as any).forEach((element: any) => {
//         let mapitem = format(new Date(element.date), "yyyy-MM-dd");
//         mapped[mapitem] = element;
//       });
//       setMappedData(mapped);
//     }
//   }, [data]);

//   useEffect(() => {
//     const newDate = setYear(currentMonth, selectOptionValue as any);
//     setCurrentMonth(newDate);
//   }, [selectOptionValue]);

//   const renderHeader = () => {
//     return (
//       <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
//         <button
//           className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
//           onClick={prevMonth}
//         >
//           {"<"}
//         </button>
//         <div className="flex items-center space-x-2">
//           <span className="text-lg font-semibold">
//             {format(currentMonth, "MMMM")}
//           </span>
//           <select
//             value={selectOptionValue}
//             onChange={(e) => setSelectOptionValue(e.target.value)}
//             className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
//           >
//             {years.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
//           onClick={nextMonth}
//         >
//           {">"}
//         </button>
//       </div>
//     );
//   };

//   const renderDays = () => {
//     const days = [];
//     const startDate = startOfWeek(currentMonth);
//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div className="text-center font-semibold text-gray-600 py-2" key={i}>
//           {format(addDays(startDate, i), "EEE")}
//         </div>
//       );
//     }
//     return <div className="grid grid-cols-7">{days}</div>;
//   };

//   const renderCells = () => {
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);
//     const rows = [];
//     let days = [];
//     let day = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const cloneDay = day;
//         let formattedDate = format(day, "d");
//         let formattedFullDate = format(day, "yyyy-MM-dd");

//         days.push(
//           <div
//             key={day.toString()}
//             className={`p-4 text-center border cursor-pointer transition-all duration-200 ${
//               !isSameMonth(day, monthStart)
//                 ? "text-gray-300"
//                 : isSameDay(day, selectedDate)
//                 ? "bg-blue-500 text-white font-bold"
//                 : "hover:bg-gray-200"
//             }`}
//             onClick={() => onDateClick(cloneDay)}
//           >
//             <div className="flex flex-col items-center">
//               <span className="text-xs font-medium">
//                 {mappedData && mappedData[formattedFullDate]
//                   ? mappedData[formattedFullDate].isWorkingDay
//                     ? "Open"
//                     : "Closed"
//                   : "N/A"}
//               </span>
//               <span className="text-lg font-semibold">{formattedDate}</span>
//             </div>
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div className="grid grid-cols-7" key={day.toString()}>
//           {days}
//         </div>
//       );
//       days = [];
//     }
//     return <div>{rows}</div>;
//   };

//   const onDateClick = (day: Date) => {
//     setSelectedDate(day);
//   };

//   const nextMonth = () => {
//     let dateNext = addMonths(currentMonth, 1);
//     setCurrentMonth(dateNext);
//     let year = dateNext.getFullYear();
//     if (year != (selectOptionValue as any)) {
//       setSelectOptionValue(year as any);
//     }
//   };

//   const prevMonth = () => {
//     let datePrev = subMonths(currentMonth, 1);
//     setCurrentMonth(datePrev);
//     let year = datePrev.getFullYear();
//     if (year != (selectOptionValue as any)) {
//       setSelectOptionValue(year as any);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row items-start justify-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-lg">
//       <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-md">
//         {renderHeader()}
//         {renderDays()}
//         {renderCells()}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// Calendar.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { CalendarProvider, useCalendar } from "./CalendarContext";
import Month from "./Month";

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

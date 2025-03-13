// "use client";
// import React, { useEffect, useState } from "react";
// import { format, startOfWeek, addDays } from "date-fns";
// import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
// import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
// import { CalendarProvider, useCalendar } from "./CalendarContext";
// import Month from "@/app/components/schedular/components/Calendar/Month";

// const Calendar: React.FC = () => {
//   const {
//     currentMonth,
//     selectedDate,
//     selectOptionValue,
//     setSelectedDate,
//     setSelectOptionValue,
//     nextMonth,
//     prevMonth,
//   } = useCalendar();
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

//   const renderHeader = () => {
//     return (
//       <div className="flex justify-between items-center p-4 bg-primary-0 shadow-md rounded-lg">
//         <button
//           className="text-xl px-2 py-1 bg-primary-200 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onClick={prevMonth}
//           aria-label="Previous month"
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
//             className="p-2 border rounded-md bg-primary-50 text-primary-700 focus:ring-2 focus:ring-blue-400"
//             aria-label="Select year"
//           >
//             {years.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="text-xl px-2 py-1 bg-primary-200 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onClick={nextMonth}
//           aria-label="Next month"
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
//         <div className="text-center font-semibold text-primary-600 py-2" key={i}>
//           {format(addDays(startDate, i), "EEE")}
//         </div>
//       );
//     }
//     return <div className="grid grid-cols-7 gap-1">{days}</div>;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg shadow-lg">
//       <div className="w-full max-w-4xl bg-primary-0 p-4 rounded-lg shadow-md">
//         {renderHeader()}
//         {renderDays()}
//         <Month
//           currentMonth={currentMonth}
//           selectedDate={selectedDate}
//           onDateClick={(day) => setSelectedDate(day)}
//           mappedData={mappedData}
//         />
//       </div>
//     </div>
//   );
// };

// export default function CalendarWrapper() {
//   return (
//     <CalendarProvider>
//       <Calendar />
//     </CalendarProvider>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { CalendarProvider, useCalendar } from "./CalendarContext";
import Month from "@/app/components/schedular/components/Calendar/Month";
import { useTranslations, useLocale } from "next-intl";

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

  const t = useTranslations("Calendar"); // Use translations for the Calendar component
  const locale = useLocale(); // Get the current locale

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
      <div className="flex justify-between items-center p-4 bg-primary-0 shadow-md rounded-lg">
        <button
          className="text-xl px-2 py-1 bg-primary-200 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={prevMonth}
          aria-label={t("previousMonth")} // Use localized aria-label
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
            className="p-2 border rounded-md bg-primary-50 text-primary-700 focus:ring-2 focus:ring-blue-400"
            aria-label={t("selectYear")} // Use localized aria-label
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-xl px-2 py-1 bg-primary-200 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={nextMonth}
          aria-label={t("nextMonth")} // Use localized aria-label
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
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full max-w-4xl bg-primary-0 p-4 rounded-lg shadow-md">
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

export default function CalendarWrapper() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

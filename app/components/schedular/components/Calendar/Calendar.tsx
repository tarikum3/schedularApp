// "use client";

// import React, { useEffect, useState } from "react";
// import { format, startOfWeek, addDays } from "date-fns";
// import {
//   useGetDayByYearQuery,
//   Day,
// } from "@/lib/admin/store/services/day.service";
// import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
// import { CalendarProvider, useCalendar } from "./CalendarContext";
// import Month from "@/app/components/schedular/components/Calendar/Month";
// import { useTranslations } from "next-intl";
// const daysList = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
// const monthsList = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
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
//   const [mappedData, setMappedData] = useState<Record<string, Day>>({});
//   const t = useTranslations("Calendar");
//   const translatedMonth = t("months");
//   console.log("translatedMonth", translatedMonth);
//   // Generate years from 2022 to 2100
//   const generateYears = (startYear: number, endYear: number): string[] => {
//     const years: string[] = [];
//     for (let year = startYear; year <= endYear; year++) {
//       years.push(format(new Date(year, 0, 1), "yyyy"));
//     }
//     return years;
//   };

//   const years = generateYears(2022, 2100);

//   // Map data to a dictionary with dates as keys
//   useEffect(() => {
//     if (data && Array.isArray(data)) {
//       const mapped: Record<string, Day> = {};
//       data.forEach((element: Day) => {
//         const mapitem = format(new Date(element.date), "yyyy-MM-dd");
//         mapped[mapitem] = element;
//       });
//       setMappedData(mapped);
//     }
//   }, [data]);

//   const renderHeader = () => {
//     const monthIndex = currentMonth.getMonth(); // Get the month index (0-11)
//     //const translatedMonth = t("months", { returnObjects: true })[monthIndex];
//     const translatedMonth = t(`months.${monthsList[monthIndex]}`);
//     return (
//       <div className="flex justify-between items-center p-4">
//         <button
//           className="text-xl px-2 py-1 bg-primary-50 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
//           onClick={prevMonth}
//           aria-label={t("previousMonth")}
//         >
//           {"<"}
//         </button>
//         <div className="flex items-center space-x-2">
//           <span className="text-lg font-semibold">
//             {translatedMonth} {/* Use translated month */}
//           </span>
//           <select
//             value={selectOptionValue}
//             onChange={(e) => setSelectOptionValue(e.target.value)}
//             className="p-2 border rounded-md bg-primary-50 text-primary-700 focus:ring-2 focus:ring-primary-400"
//             aria-label={t("selectYear")}
//           >
//             {years.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="text-xl px-2 py-1 bg-primary-50 hover:bg-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
//           onClick={nextMonth}
//           aria-label={t("nextMonth")}
//         >
//           {">"}
//         </button>
//       </div>
//     );
//   };

//   // Render the days of the week
//   const renderDays = () => {
//     const days: JSX.Element[] = [];
//     const startDate = startOfWeek(currentMonth);

//     // Get translated days of the week
//     const translatedDays = t("daysOfWeek", {
//       returnObjects: true,
//     }) as unknown as string[];
//     console.log("translatedDaysaf", translatedDays);
//     // Ensure translatedDays is an array and has 7 items

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div
//           className="text-center font-semibold text-primary-600 py-2"
//           key={i}
//         >
//           {/* {translatedDays[i]}  */}
//           {t(`daysOfWeek.${daysList[i]}`)}
//         </div>
//       );
//     }
//     return <div className="grid grid-cols-7 gap-1">{days}</div>;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <div className="w-full bg-primary-0 px-4">
//         {renderHeader()}
//         {renderDays()}
//         <Month
//           currentMonth={currentMonth}
//           selectedDate={selectedDate}
//           onDateClick={(day: Date) => setSelectedDate(day)}
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

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { format, startOfWeek } from "date-fns";
import {
  useGetDayByYearQuery,
  Day,
} from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { CalendarProvider, useCalendar } from "./CalendarContext";
import Month from "@/app/components/schedular/components/Calendar/Month";
import { useTranslations } from "next-intl";

// Constants
const DAYS_LIST = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTHS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  const { data: daysData } = useGetDayByYearQuery(format(new Date(), "yyyy"));
  const { data: scheduleData } = useGetAllSchedulesQuery();
  const [mappedData, setMappedData] = useState<Record<string, Day>>({});
  const t = useTranslations("Calendar");

  // Generate years from 2022 to 2100
  const years = useMemo(() => {
    const years: string[] = [];
    for (let year = 2022; year <= 2100; year++) {
      years.push(format(new Date(year, 0, 1), "yyyy"));
    }
    return years;
  }, []);

  // Map data to a dictionary with dates as keys
  useEffect(() => {
    if (daysData && Array.isArray(daysData)) {
      const mapped: Record<string, Day> = {};
      daysData.forEach((element: Day) => {
        const mapItem = format(new Date(element.date), "yyyy-MM-dd");
        mapped[mapItem] = element;
      });
      setMappedData(mapped);
    }
  }, [daysData]);

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectOptionValue(e.target.value);
    },
    [setSelectOptionValue]
  );

  const renderHeader = useCallback(() => {
    const monthIndex = currentMonth.getMonth();
    const translatedMonth = t(`months.${MONTHS_LIST[monthIndex]}`);

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
          <span className="text-lg font-semibold">{translatedMonth}</span>
          <select
            value={selectOptionValue}
            onChange={handleYearChange}
            className="p-2 border rounded-md bg-primary-50 text-primary-700 focus:ring-2 focus:ring-primary-400"
            aria-label={t("selectYear")}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
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
  }, [
    currentMonth,
    prevMonth,
    nextMonth,
    selectOptionValue,
    handleYearChange,
    t,
    years,
  ]);

  const renderDays = useCallback(() => {
    return (
      <div className="grid grid-cols-7 gap-1">
        {DAYS_LIST.map((day, index) => (
          <div
            className="text-center font-semibold text-primary-600 py-2"
            key={index}
          >
            {t(`daysOfWeek.${day}`)}
          </div>
        ))}
      </div>
    );
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full bg-primary-0 px-4">
        {renderHeader()}
        {renderDays()}
        <Month
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={setSelectedDate}
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

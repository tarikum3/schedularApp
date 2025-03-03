// CalendarContext.tsx
import React, { createContext, useContext, useState } from "react";
import { format, addMonths, subMonths, setYear } from "date-fns";

interface CalendarContextType {
  currentMonth: Date;
  selectedDate: Date;
  selectOptionValue: string;
  setCurrentMonth: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  setSelectOptionValue: (value: string) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectOptionValue, setSelectOptionValue] = useState(
    format(new Date(), "yyyy")
  );

  const nextMonth = () => {
    let dateNext = addMonths(currentMonth, 1);
    setCurrentMonth(dateNext);
    let year = dateNext.getFullYear();
    if (year != (selectOptionValue as any)) {
      setSelectOptionValue(year as any);
    }
  };

  const prevMonth = () => {
    let datePrev = subMonths(currentMonth, 1);
    setCurrentMonth(datePrev);
    let year = datePrev.getFullYear();
    if (year != (selectOptionValue as any)) {
      setSelectOptionValue(year as any);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        currentMonth,
        selectedDate,
        selectOptionValue,
        setCurrentMonth,
        setSelectedDate,
        setSelectOptionValue,
        nextMonth,
        prevMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

"use client";

import React, { useMemo, useState } from "react";
import { format, isSameMonth, isSameDay } from "date-fns";
import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
import ModalComponent from "@components/schedular/components/ui/ModalComponent";
import ScheduleItem from "@/app/components/schedular/components/schedule/ScheduleItem";
import { useTranslations } from "next-intl";

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
  schedules?: Schedule[];
}

const Day: React.FC<DayProps> = ({
  day,
  monthStart,
  selectedDate,
  onDateClick,
  mappedData,
  schedules = [],
}) => {
  const t = useTranslations("Day"); // Use translations for this component
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formattedDate = format(day, "d");
  const formattedFullDate = format(day, "yyyy-MM-dd");

  const scheduleTypesPresent = useMemo(() => {
    return Array.from(
      new Set(schedules.map((schedule) => schedule.scheduleType))
    );
  }, [schedules]);

  const scheduleTypeColors = {
    MEETING: "bg-accent-notification-500",
    APPOINTMENT: "bg-accent-positive-500",
    PERSONAL: "bg-accent-warning-500",
  };

  const isCurrentMonth = isSameMonth(day, monthStart);
  const isSelectedDay = isSameDay(day, selectedDate);

  const handleClick = () => {
    if (schedules.length === 0) {
      setModalOpen(true);
    }
    onDateClick(day);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div
        className={`relative p-4 text-center border cursor-pointer transition-all duration-200 ${
          !isCurrentMonth
            ? "text-primary-300"
            : isSelectedDay
            ? "bg-primary-500 text-primary-0 font-bold"
            : "hover:bg-primary-100"
        }`}
        onClick={handleClick}
        role="button"
        aria-label={`Select date ${formattedFullDate}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">{formattedDate}</span>
          <div className="flex -space-x-2.5 mt-1 justify-end">
            {scheduleTypesPresent.map((type, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full ${scheduleTypeColors[type]}`}
                title={type}
                aria-label={`Schedule type: ${type}`}
              />
            ))}
          </div>
        </div>

        {schedules.length > 0 && (
          <div className="absolute bottom-1 left-1">
            <button
              onClick={toggleDropdown}
              className="text-xs text-primary-600 hover:text-primary-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Toggle dropdown for ${schedules.length} schedules`}
            >
              {schedules.length}
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-1 w-40 bg-primary-0 border border-primary-200 rounded-lg shadow-lg z-10">
                <ul>
                  {schedules.map((schedule) => (
                    <ScheduleItem
                      key={schedule.id}
                      item={schedule as any}
                      version="mini"
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {modalOpen && schedules.length === 0 && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: t("createSchedule") }}
          fullWidth
        >
          <CreateSchedule />
        </ModalComponent>
      )}
    </>
  );
};

export default Day;

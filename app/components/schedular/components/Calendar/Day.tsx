"use client";

import React, { useMemo, useState, useCallback } from "react";
import { format, isSameMonth, isSameDay } from "date-fns";
import dynamic from "next/dynamic";
import { Schedule } from "@/lib/admin/store/services/schedule.service";
import { useTranslations } from "next-intl";
import {
  ModalSkeleton,
  CreateScheduleSkeleton,
  ScheduleItemSkeleton,
} from "@/app/components/schedular/components/ui/Skeletons";

const CreateSchedule = dynamic(
  () => import("@/app/components/schedular/components/schedule/CreateSchedule"),
  {
    loading: () => <CreateScheduleSkeleton />,
    ssr: false,
  }
);

const ModalComponent = dynamic(
  () => import("@components/schedular/components/ui/ModalComponent"),
  {
    loading: () => <ModalSkeleton />,
    ssr: false,
  }
);

const ScheduleItem = dynamic(
  () => import("@/app/components/schedular/components/schedule/ScheduleItem"),
  {
    loading: () => <ScheduleItemSkeleton />,
    ssr: false,
  }
);

interface DayProps {
  day: Date;
  monthStart: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  mappedData: Record<string, { isWorkingDay: boolean }>;
  schedules?: Schedule[];
}

const scheduleTypeColors = {
  MEETING: "bg-accent-danger-600",
  APPOINTMENT: "bg-accent-positive-600",
  PERSONAL: "bg-accent-warning-600",
};

const Day: React.FC<DayProps> = ({
  day,
  monthStart,
  selectedDate,
  onDateClick,
  mappedData,
  schedules = [],
}) => {
  const t = useTranslations("Day");
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formattedDate = format(day, "d");
  const formattedFullDate = format(day, "yyyy-MM-dd");

  const isCurrentMonth = isSameMonth(day, monthStart);
  const isSelectedDay = isSameDay(day, selectedDate);

  // Memoize schedule types to avoid recalculating on every render
  const scheduleTypesPresent = useMemo(() => {
    return Array.from(
      new Set(schedules.map((schedule) => schedule.scheduleType))
    );
  }, [schedules]);

  // Memoize the dropdown schedules to avoid unnecessary re-renders
  const dropdownSchedules = useMemo(() => {
    return schedules.map((schedule) => (
      <ScheduleItem key={schedule.id} item={schedule} version="mini" />
    ));
  }, [schedules]);

  // Use useCallback to memoize event handlers
  const handleClick = useCallback(() => {
    if (schedules.length === 0) {
      setModalOpen(true);
    }
    onDateClick(day);
  }, [schedules.length, onDateClick, day]);

  const toggleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

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
        tabIndex={0}
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
            {schedules.length > 0 && (
              <div className="">
                <button
                  onClick={toggleDropdown}
                  className="text-xs text-primary-200 hover:text-primary-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-200"
                  aria-label={`Toggle dropdown for ${schedules.length} schedules`}
                >
                  {schedules.length}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* {schedules.length > 0 && (
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
                <ul>{dropdownSchedules}</ul>
              </div>
            )}
          </div>
        )} */}

        {dropdownOpen && (
          <div className="absolute left-0 mt-1 w-40 bg-primary-0 border border-primary-200 rounded-lg shadow-lg z-10">
            <ul>{dropdownSchedules}</ul>
          </div>
        )}
      </div>

      {modalOpen && schedules.length === 0 && (
        <ModalComponent
          open={modalOpen}
          onClose={closeModal}
          titles={{ title: t("CreateSchedule") }}
          fullWidth
        >
          <CreateSchedule />
        </ModalComponent>
      )}
    </>
  );
};

export default React.memo(Day);

"use client";
import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import MenuIcon from "@mui/icons-material/Menu";

const Calendar = dynamic(
  () => import("@components/schedular/components/Calendar/Calendar"),
  {
    // loading: () => <ScheduleListSkeleton />,
    ssr: false,
  }
);

const ScheduleListSkeleton = () => (
  <div className="w-full p-4  h-full overflow-y-clip">
    <div className="flex flex-col h-full">
      <div className="animate-pulse">
        <div className="h-24 bg-primary-200 rounded-lg mb-2"></div>
        <div className="h-full bg-primary-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const ScheduleList = dynamic(
  () => import("@/app/components/schedular/components/schedule/ScheduleList"),
  {
    loading: () => <ScheduleListSkeleton />,
    ssr: false,
  }
);
const CalendarPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-full max-h-screen justify-between px-6">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-primary-0 transition-all duration-300 ${
          isSidebarOpen ? "w-64 md:w-80" : "w-16"
        } h-full z-50`}
      >
        {/* Menu Icon */}
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-primary-600 hover:text-primary-900 focus:outline-none"
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Conditionally render ScheduleList */}
        {isSidebarOpen && (
          <div className="flex-1 overflow-y-auto">
            <ScheduleList />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;

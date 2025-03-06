"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ScheduleList from "@/app/components/schedular/components/schedule/ScheduleList";
import Calendar from "@components/schedular/components/Calendar/Calendar";

const CalendarPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 border ">
      {/* Left Side */}
      <div
        className={`flex flex-col bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-72" : "w-16"
        }`}
      >
        {/* Menu Icon */}
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Schedule List */}
        <div
          className={`flex-1 overflow-y-auto ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <ScheduleList />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;

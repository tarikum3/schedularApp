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
    <div className="flex h-full bg-primary-100 px-8">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-primary-0 shadow-lg transition-all duration-300 
      ${
        isSidebarOpen ? "w-64 md:w-80" : "w-16"
      } absolute md:relative h-full z-50`}
      >
        {/* Menu Icon */}
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-primary-600 hover:text-primary-900 focus:outline-none"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Schedule List */}
        <div
          className={`flex-1 overflow-y-auto ${
            isSidebarOpen ? "block" : "hidden "
          }`}
        >
          <ScheduleList />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto md:ml-0 ml-16">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;

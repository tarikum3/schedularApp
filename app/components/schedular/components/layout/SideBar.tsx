"use client";

import * as React from "react";

import { useTranslations } from "next-intl";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";
import CloseIcon from "@mui/icons-material/Close";
import ScheduleList from "@/app/components/schedular/components/schedule/ScheduleList";
export default function SideBar() {
  const t = useTranslations("SideBar");
  const { displayLeftSidebar, closeLeftSidebar } = useUI();

  React.useEffect(() => {}, [t]);

  return (
    <div className="fixed top-0 left-0 right-0 border-r border-primary-300 h-full pb-12 w-[270px] z-50">
      <div className="h-full flex flex-col justify-end">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between  p-4 border-b border-primary-300">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            className=" text-primary-900 hover:text-primary-900 cursor-pointer p-2 hover:bg-primary-100 focus:bg-primary-100 focus:ring-2 focus:ring-primary-100 rounded"
            onClick={closeLeftSidebar}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="mt-1 w-full h-full overflow-y-auto bg-primary-0 p-2">
          <ScheduleList />
        </div>
      </div>
    </div>
  );
}

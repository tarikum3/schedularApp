"use client";

import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

import { useUI } from "@/app/components/admin/components/ui/UIContext";
//import ToolBar from "@/app/components/admin/components/layout/Toolbar";
import dynamic from "next/dynamic";

const Loading = () => (
  <div className="bg-primary-400 flex items-center space-x-4 px-8 h-full w-full"></div>
);

const dynamicProps = {
  loading: Loading,
};
const ToolBar = dynamic(
  () => import("@/app/components/admin/components/layout/Toolbar"),
  {
    ...dynamicProps,
    ssr: false,
  }
);

const Header = () => {
  const { displayLeftSidebar, openLeftSidebar } = useUI();
  console.log("displayLeftSidebarrr", displayLeftSidebar);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white">
      <div
        className={`py-3 lg:px-5 transition-all duration-300 ${
          displayLeftSidebar ? "lg:ml-[270px]" : "lg:ml-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Show MenuIcon only when sidebar is closed */}
            {!displayLeftSidebar && (
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="mr-2 text-gray-900 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                onClick={openLeftSidebar} // Toggle the sidebar
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            )}
          </div>

          <ToolBar />
        </div>
      </div>
    </nav>
  );
};

export default Header;

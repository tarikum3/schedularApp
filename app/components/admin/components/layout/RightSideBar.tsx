"use client";
import React from "react";
import NotificationPanel from "@/app/components/admin/components/notification/NotificationPanel";
import { useUI } from "@/app/components/admin/components/ui/UIContext";
const RightSidebar = () => {
  const { displayRightSidebar, closeRightSidebar } = useUI();

  return (
    <>
      {/* Overlay Background */}
      {displayRightSidebar && (
        <div
          className="fixed inset-0 bg-primary-0 opacity-50 z-40"
          onClick={closeRightSidebar}
        />
      )}

      <aside
        className={`fixed top-0 right-0 w-80 h-full shadow-lg transform z-40 transition-transform duration-300 ${
          displayRightSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-primary-600 hover:text-black"
          onClick={closeRightSidebar}
        >
          ✖
        </button>

        {/* Sidebar Content */}
        <div className="h-full mt-20 ">
          <NotificationPanel />
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;

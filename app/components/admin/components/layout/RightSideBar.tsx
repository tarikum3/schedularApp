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
          className="fixed inset-0 bg-white opacity-50 z-40"
          onClick={closeRightSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-80 h-full shadow-lg transform z-50 transition-transform duration-300 ${
          displayRightSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={closeRightSidebar}
        >
          ✖
        </button>

        {/* Sidebar Content */}
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-4">Right Sidebar</h2>
          <p className="text-sm text-gray-600">Your content goes here.</p>
         < NotificationPanel/>
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;

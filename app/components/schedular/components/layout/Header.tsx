"use client";

import React from "react";

import { useUI } from "@/app/components/schedular/components/ui/UIContext";

import { Logo } from "@/app/components";
import dynamic from "next/dynamic";

const ToolBar = dynamic(
  () => import("@/app/components/schedular/components/layout/Toolbar"),
  {
    loading: () => (
      <div className="bg-primary-400 flex items-center space-x-4 px-8 size-6"></div>
    ),
    ssr: false,
  }
);
const Header = () => {
  const { displayLeftSidebar, openLeftSidebar } = useUI();
  console.log("displayLeftSidebarrr", displayLeftSidebar);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary-0">
      <div className={`py-3 lg:px-5 transition-all duration-300 `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center px-8">
            <Logo className="w-12 h-12" />
          </div>
          <div className="flex items-center space-x-4 px-8 h-full">
            {/* <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton /> */}
            <ToolBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

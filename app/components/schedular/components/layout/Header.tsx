"use client";

import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import LanguageSwitcher from "@/app/components/schedular/components/ui/LanguageSwitcher";
// import NotificationIcon from "@/app/components/admin/components/notification/NotificationIcon";
import ThemeSwitcher from "@/app/components/schedular/components/ui/ThemeSwitcher";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";
import UserButton from "@/app/components/schedular/components/User/UserButton";
import { Logo } from "@/app/components";
const Header = () => {
  const { displayLeftSidebar, openLeftSidebar } = useUI();
  console.log("displayLeftSidebarrr", displayLeftSidebar);
  return (
    <nav className=" z-40 bg-primary-0">
      <div className={`py-3 lg:px-5 transition-all duration-300 `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center px-8">
            <Logo className="w-10 h-10" />
          </div>
          <div className="flex items-center space-x-4 px-8 h-full">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

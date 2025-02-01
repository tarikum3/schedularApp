

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from "@/app/components";
import { Menu as MenuIcon, Close as CloseIcon, Notifications as NotificationsIcon, AccountCircle as AccountIcon, Settings as SettingsIcon } from '@mui/icons-material';
 import SideBar from './SideBar';
//import LanguageSwitcher from "@/app/components/admin/components/ui/LanguageSwitcher";
const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 overflow-hidden">
        <div className=" py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between  w-[270px] ">
            <Link
                href="/"
                className="text-xl font-bold flex justify-center items-center lg:ml-2.5"
              >
                <Logo
                  className="h-14 ml-4 mr-2 mx-auto"
                  alt="logo"
                />
              </Link>
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-900 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
      
            </div>
            <div className="flex items-center space-x-4 px-8 h-full">
              <button className="text-gray-900 hover:text-gray-600 p-2">
                <NotificationsIcon />
              </button>
              <button className="text-gray-900 hover:text-gray-600 p-2">
             
              </button>
              <button className="w-4 h-4 relative text-gray-900 hover:text-gray-600 p-2">
                {/* <LanguageSwitcher  /> */}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-[999] inset-0 bg-black opacity-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={closeSidebar}
      ></div>
      <aside
        className={`fixed bg-white z-[999] h-full top-0 left-0 pt-[80px] lg:flex flex-shrink-0 flex-col w-[270px] transition-width duration-75 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <SideBar />
      </aside>
    </>
  );
};

export default Header;

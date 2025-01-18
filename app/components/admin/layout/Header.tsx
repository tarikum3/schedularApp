'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideBar from './SideBar';
import { Logo,  } from "@/app/components";
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
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-900 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              onClick={toggleSidebar}
          >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="text-xl font-bold flex justify-center items-center lg:ml-2.5"
            >
              <Logo
                
                className="h-14 ml-4 mr-2 mx-auto"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* <NotificationMenu /> 
            <AccountMenu /> */}
          </div>
        </div>
      </div>
    </nav>
          <div
            className={`fixed z-[999] inset-0 bg-black opacity-50 lg:hidden ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
            onClick={closeSidebar}
          ></div>
          <aside
            className={`fixed bg-white z-[999] h-full top-0 left-0 pt-[80px] lg:flex flex-shrink-0 flex-col w-[270px] transition-width duration-75 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}
            aria-label="Sidebar"
          >
           <SideBar
          //  isOpen={isSidebarOpen} closeSidebar={closeSidebar}
             />
          </aside></>
  );
};

export default Header;

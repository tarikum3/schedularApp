"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
import Header from "@/app/components/schedular/components/layout/Header";
import RightSideBar from "@/app/components/schedular/components/layout/RightSideBar";
import SideBar from "@/app/components/schedular/components/layout/SideBar";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayLeftSidebar } = useUI();

  return (
    <div>
      <Header />
      <main
        className={` flex flex-col relative overflow-y-auto ${
          displayLeftSidebar ? "lg:ml-[270px]" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
      {/* <RightSideBar /> */}

      {displayLeftSidebar && <SideBar />}
    </div>
  );
};

export default Layout;

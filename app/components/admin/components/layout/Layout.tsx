"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
import Header from "@/app/components/admin/components/layout/Header";
// import RightSideBar from "@/app/components/admin/components/layout/RightSideBar";
// import SideBar from "@/app/components/admin/components/layout/SideBar";
import { useUI } from "@/app/components/admin/components/ui/UIContext";
import dynamic from "next/dynamic";

const RightSideBar = dynamic(
  () => import("@/app/components/admin/components/layout/RightSideBar"),
  {
    loading: () => <div className=""></div>,
    ssr: false,
  }
);
const SideBar = dynamic(
  () => import("@/app/components/admin/components/layout/SideBar"),
  {
    loading: () => <div className=""></div>,
    ssr: false,
  }
);

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayRightSidebar, displayLeftSidebar } = useUI();

  return (
    <div className="">
      <Header />
      <main
        className={`mt-24 flex flex-col relative overflow-y-auto ${
          displayLeftSidebar ? "lg:ml-[270px]" : "lg:ml-0"
        }`}
      >
        {children}
      </main>
      {/* <RightSideBar />
      <SideBar /> */}
      {displayRightSidebar && <RightSideBar />}
      {displayLeftSidebar && <SideBar />}
    </div>
  );
};

export default Layout;

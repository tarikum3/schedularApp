"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
import Header from "@/app/components/schedular/components/layout/Header";

//import SideBar from "@/app/components/schedular/components/layout/SideBar";
import { useUI } from "@/app/components/schedular/components/ui/UIContext";
import { RightSideBarSkeleton } from "@components/schedular/components/ui/Skeletons";
import dynamic from "next/dynamic";
const RightSideBar = dynamic(
  () => import("@/app/components/schedular/components/layout/RightSideBar"),
  {
    loading: () => <RightSideBarSkeleton />,
    ssr: false,
  }
);
interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayRightSidebar, displayLeftSidebar } = useUI();

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
      {displayRightSidebar && <RightSideBar />}
      {/* {displayLeftSidebar && <SideBar />} */}
    </div>
  );
};

export default Layout;

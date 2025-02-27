"use client";

import React, { FC, useEffect, useRef, ReactElement, ReactNode } from "react";
import Header from "@/app/components/admin/components/layout/Header";
interface LayoutProps {
  children?: ReactNode;
}
import { useUI } from "@/app/components/admin/components/ui/UIContext";
const Layout: FC<LayoutProps> = ({ children }) => {
  const { displayLeftSidebar } = useUI();

  return (
    <>
      <Header />
      <div
        id="main-content"
        className=" flex flex-col relative overflow-y-auto  lg:ml-[270px]"
      >
        {children}
      </div>
    </>
  );
};

export default Layout;

"use client";
import React, { FC, ReactNode,  } from "react";
import { ManagedUIContext } from "@/app/components/context";
import {ManagedUIContext as ManagedUIContextAdmin } from "@/app/components/admin/components/ui/UIContext";
import { SessionProvider } from "next-auth/react";

 const SessionWrapper: FC<{ children?: ReactNode }> = ({
    children,
  }) => (
    <SessionProvider>
      <ManagedUIContextAdmin>
      <ManagedUIContext>
      {children}
      </ ManagedUIContext>
      </ManagedUIContextAdmin>
    </SessionProvider>
  );


  export default SessionWrapper;
"use client";
import React, { FC, ReactNode } from "react";

import { ManagedUIContext } from "@/app/components/schedular/components/ui/UIContext";
import { SessionProvider } from "next-auth/react";

const SessionWrapper: FC<{ children?: ReactNode }> = ({ children }) => (
  <SessionProvider>
    <ManagedUIContext>{children}</ManagedUIContext>
  </SessionProvider>
);

export default SessionWrapper;

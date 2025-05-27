"use client";
import React, { lazy, Suspense } from "react";

const LanguageSwitcher = lazy(
  () => import("@/app/components/schedular/components/ui/LanguageSwitcher")
);

const ThemeSwitcher = lazy(
  () => import("@/app/components/schedular/components/ui/ThemeSwitcher")
);
const UserButton = lazy(
  () => import("@/app/components/schedular/components/User/UserButton")
);
const Toolbar = () => {
  return (
    <div className="flex items-center space-x-4 h-full">
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <LanguageSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <ThemeSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <UserButton />
      </Suspense>
    </div>
  );
};

export default Toolbar;

// "use client";

// import LanguageSwitcher from "@/app/components/admin/components/ui/LanguageSwitcher";
// import NotificationIcon from "@/app/components/admin/components/notification/NotificationIcon";
// import ThemeSwitcher from "@/app/components/admin/components/ui/ThemeSwitcher";
// const Toolbar = () => {
//   return (
//     <div className="flex items-center space-x-4 px-8 h-full">
//       <LanguageSwitcher />
//       <ThemeSwitcher />
//       <NotificationIcon />
//     </div>
//   );
// };

// export default Toolbar;

"use client";
import React, { FC, memo, useCallback, useMemo, lazy, Suspense } from "react";

const LanguageSwitcher = lazy(
  () => import("@/app/components/admin/components/ui/LanguageSwitcher")
);
const NotificationIcon = lazy(
  () =>
    import("@/app/components/admin/components/notification/NotificationIcon")
);
const ThemeSwitcher = lazy(
  () => import("@/app/components/admin/components/ui/ThemeSwitcher")
);
const Toolbar = () => {
  return (
    <div className="flex items-center space-x-4 px-8 h-full">
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <LanguageSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <ThemeSwitcher />
      </Suspense>
      <Suspense fallback={<div className="bg-primary-300 size-6"></div>}>
        <NotificationIcon />
      </Suspense>
    </div>
  );
};

export default Toolbar;

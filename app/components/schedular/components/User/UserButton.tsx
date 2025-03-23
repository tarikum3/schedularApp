"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UserIcon } from "@/app/components/icons";

const SkeletonLoading = () => (
  <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
    <div className="px-2 py-2 bg-primary-100 rounded-md shadow absolute right-0">
      <div className="animate-pulse">
        <div className="h-8 bg-primary-200 rounded-lg mb-2"></div>
        <div className="h-8 bg-primary-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const UserView = dynamic(
  () => import("@/app/components/schedular/components/User/UserView"),
  {
    loading: () => <SkeletonLoading />,
    ssr: false,
  }
);

const UserButton = () => {
  const [dropdown, setDropdown] = useState("");

  const handleDropdown = useCallback((current: string = "") => {
    setDropdown((prev) => (prev === current ? "" : current));
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-4 py-2 border border-primary-300 rounded-lg bg-primary-0 shadow-sm hover:bg-primary-100"
        onClick={() => handleDropdown("user")}
        aria-label="Toggle user menu"
      >
        <UserIcon className="size-6" />
      </button>

      {dropdown === "user" && <UserView />}
    </div>
  );
};

export default UserButton;

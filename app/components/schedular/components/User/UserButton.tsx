"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UserIcon } from "@/app/components/icons";
import { UserViewSkeleton } from "@/app/components/schedular/components/ui/Skeletons";

const UserView = dynamic(
  () => import("@/app/components/schedular/components/User/UserView"),
  {
    loading: () => <UserViewSkeleton />,
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

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { UserIcon } from "@/app/components/icons";

import { useSearchParams } from "next/navigation";

const Loading = () => (
  <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg ">
    <div className="px-2 py-2 bg-primary-100 rounded-md shadow absolute right-0 ">
      Loading...
    </div>
  </div>
);

const dynamicProps = {
  loading: Loading,
};
const UserView = dynamic(
  () => import("@/app/components/schedular/components/User/UserView"),
  {
    ...dynamicProps,
    ssr: false,
  }
);

const UserUI: React.FC = () => {
  return <UserView />;
};

const UserButton = () => {
  const [dropdown, setDropdown] = useState("");

  const handleDropdown = (current: string = "") => {
    if (dropdown == current) {
      setDropdown("");
    } else {
      setDropdown(current);
    }
  };

  //console.log("cartt",cart);
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-4 py-2 border border-primary-300 rounded-lg bg-primary-0 shadow-sm hover:bg-primary-100 "
        onClick={() => {
          handleDropdown("");

          handleDropdown("user");
        }}
        aria-label="Menu"
      >
        <UserIcon className="size-6" />
      </button>

      {dropdown == "user" && <UserUI />}
    </div>
  );
};

export default UserButton;

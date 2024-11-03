"use client";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, UserIcon } from "@/app/components/icons";
import Clickoutside from "@/app/components/common/Clickoutside";
import { useUI } from "@/app/components/context";
import { useSession } from "next-auth/react";
import { logOut } from "@lib/actions/actions";

import { useRouter, useSearchParams } from "next/navigation";
const UserView: FC = () => {
  const { theme, setTheme } = useTheme();
  const [display, setDisplay] = useState(true);
  const { openModal, setModalView } = useUI();
  const [dropdown, setDropdown] = useState("");
  const { data: session, status } = useSession();
  //const { notRegistered, reset } = useParams();
  const searchParam = useSearchParams();

  const router = useRouter();
  const handleDropdown = (current: string = "") => {
    if (dropdown == current) {
      setDropdown("");
    } else {
      setDropdown(current);
      setDisplay(true);
    }
  };
  useEffect(() => {
    const reset = searchParam.get("reset");
    const notRegistered = searchParam.get("notRegistered");
    if (notRegistered) {
      openModal();
      setModalView("SIGNUP_VIEW");
    }
    if (reset) {
      openModal();
      setModalView("RESET_VIEW");
    }
  }, [searchParam]);

  return (
    <>
      <div className="relative ">
        <button
          onClick={() => {
            handleDropdown("");

            session?.user
              ? handleDropdown("user")
              : openModal() || setModalView("LOGIN_VIEW");
          }}
          aria-label="Menu"
        >
          <UserIcon className="size-6" />
        </button>

        {dropdown == "user" && session?.user && (
          <Clickoutside status={display} onClick={() => setDisplay(false)}>
            <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg ">
              <div className="px-2 py-2 bg-primary-100 rounded-md shadow absolute right-0 ">
                <button
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-primary-900 focus:text-primary-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => router.push("/profile")}
                >
                  {"My profile"}
                </button>

                <button
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-primary-900 focus:text-primary-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                >
                  <span className="flex items-center gap-1">
                    Theme:{" "}
                    {theme == "dark" ? (
                      <Moon className="size-3" />
                    ) : (
                      <Sun className="size-3" />
                    )}
                  </span>
                </button>

                <button
                  className="block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 hover:text-primary-900 focus:text-primary-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={async () => {
                    await logOut();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </Clickoutside>
        )}
      </div>
    </>
  );
};

export default UserView;

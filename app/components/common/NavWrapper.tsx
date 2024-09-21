"use client";
import { FC, useState, useEffect } from "react";
import Link from "next/link";

import { Logo } from "@/app/components";
import { Searchbar } from "@/app/components/common";

import { Bag, Search as SearchIcon } from "@/app/components/icons";

import React from "react";

// const CartView = dynamic(() => import("@components/cart/CartView"), {
//   loading: Loading,
//   ssr: false,
// });

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Women",
    url: "/collection/women",
  },
  {
    name: "Men",
    url: "/collection/men",
  },
];

interface Props {
  children?: React.ReactNode;
}
const NavWrapper: FC<Props> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchExtend, setSearchExtend] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      const throttle = (await import("lodash.throttle")).default;
      const fun = throttle(() => {
        const offset = 0;
        const { scrollTop } = document.documentElement;
        const scrolled = scrollTop > offset;

        if (hasScrolled !== scrolled) {
          setHasScrolled(scrolled);
        }
      }, 200);
      fun();
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div
      className={`${
        hasScrolled ? "shadow-magical " : ""
      }sticky  top-0 min-h-[74px] bg-primary-100  z-40 transition-all duration-150  px-6`}
    >
      <div className="relative flex flex-row items-center  justify-between py-4 md:py-4">
        <div className="flex items-center flex-auto ">
          <Link
            href="/"
            // className={s.logo}
            className="cursor-pointer rounded-full border transform duration-100 ease-in-out hover:shadow-md"
            aria-label="Logo"
          >
            <Logo className="size-9" />
          </Link>
          <nav
            className={` ${
              searchExtend ? "hidden" : ""
            } sm:hidden flex-auto ml-6 space-x-4 `}
          >
            {links?.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                // className={s.link}
                className="inline-flex items-center text-sm text-primary-900  font-semibold transition ease-in-out duration-75 cursor-pointer  hover:text-primary-900 "
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <nav className={` hidden sm:block flex-auto ml-6 space-x-4 `}>
            {links?.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                // className={s.link}
                className="inline-flex items-center text-sm text-primary-900  font-semibold transition ease-in-out duration-75 cursor-pointer  hover:text-primary-900 "
              >
                {l.name}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className={` ${searchExtend ? "" : "hidden"} sm:hidden flex-auto `}
          onClick={() => {
            setSearchExtend(true);
          }}
        >
          <Searchbar />
        </div>
        <div className={` hidden sm:block flex-auto `}>
          <Searchbar />
        </div>
        <div className=" flex items-center justify-end flex-auto space-x-8">
          <button
            className={`${searchExtend ? "hidden" : ""} sm:hidden`}
            onClick={() => {
              setSearchExtend(true);
            }}
          >
            <SearchIcon />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
export default NavWrapper;

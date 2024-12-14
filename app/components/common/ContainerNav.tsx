"use client";
import { FC, useState, useEffect } from "react";


import React from "react";

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
const ContainerNav: FC<Props> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

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
        hasScrolled ? " " : ""
      }sticky  top-0 min-h-[74px] bg-primary-100  z-40 transition-all duration-150  px-6`}
    >
     {children}
    </div>
  );
};

export default ContainerNav;

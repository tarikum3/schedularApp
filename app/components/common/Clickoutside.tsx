"use client";
import { FC, useEffect, useRef, ReactElement, ReactNode } from "react";

interface ClickOutsideProps {
  nameFor?: string;
  status: boolean;
  onClick: (e?: MouseEvent) => void;

  children?: ReactNode;
}
const Clickoutside: FC<ClickOutsideProps> = ({
  onClick,
  children,
  status = true,
}) => {
  const clickRef = useRef<any>(null);

  useEffect(() => {
    if (status) {
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("touchstart", onClickOutside);
    }
    return () => {
      if (status) {
        document.removeEventListener("mousedown", onClickOutside);
        document.removeEventListener("touchstart", onClickOutside);
      }
    };
  });

  const onClickOutside = (e: any) => {
    const element: ReactElement = e.target;

    if (!(clickRef.current && clickRef.current.contains(element))) {
      onClick();
    }
  };
  return <div ref={clickRef}>{status && children}</div>;
};
export default Clickoutside;

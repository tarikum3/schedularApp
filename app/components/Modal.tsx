"use client";
import { FC, useRef, useEffect, useCallback, ReactNode } from "react";
//import s from './Modal.module.css'
import { Cross } from "@/app/components/icons";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose]
  );
  // const scrollTop = () =>{
  //   //const scrolled = document.body.scrollTop;
  //   window.scrollTo({
  //     top: scrolled,
  //     behavior: 'auto'

  //   });

  // };

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener("keydown", handleKey);
      // window.addEventListener('scroll', scrollTop);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
      // window.removeEventListener('scroll', scrollTop);
    };
  }, [handleKey]);

  return (
    <div className="fixed bg-black bg-opacity-40 flex items-center inset-0 z-50 justify-center">
      <div
        className="bg-primary-100 p-12 border border-primary-300 relative focus:outline-none"
        role="dialog"
        ref={ref}
      >
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          className="hover:text-primary-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
        >
          <Cross className="h-6 w-6" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

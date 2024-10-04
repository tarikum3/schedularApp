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

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <div className="fixed bg-black bg-opacity-50 flex items-center justify-center inset-0 z-50">
      <div
        className="bg-white p-8 md:p-12 rounded-lg shadow-lg relative border border-gray-200 focus:outline-none"
        role="dialog"
        ref={ref}
      >
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="absolute right-4 top-4 text-primary-500 hover:text-primary-700 transition ease-in-out duration-150 focus:outline-none"
        >
          <Cross className="w-6 h-6" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

"use client";
import { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
//import { useAppState } from 'store/appState';

type PropsTypes = {
  title: string;

  loadingText?: string;
};

type Props = {
  titles: PropsTypes;
  children: React.ReactNode | React.ReactNode[];

  onClose: () => void;
  open?: boolean;

  fullWidth?: boolean;
  customSize?: string;
};

export default function ModalComponent({
  titles: { title, loadingText },
  children,
  open = false,
  //refresh,
  onClose,

  fullWidth = false,
  customSize,
}: Props) {
  //const { getTheme } = useAppState();
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleClose = useCallback(() => {
    //refresh();
    onClose();
  }, [, setLoading, onClose]);

  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxWidth: "100vw",
            background: "#FFF",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 25, 0.4)",
            backdropFilter: "blur(2px)",
          },
        }}
        // maxWidth={false}
      >
        <div
          className={`${
            customSize ? customSize : fullWidth ? "" : "max-w-[1200px]"
          } flex flex-col min-w-[80vw] md:min-w-[900px] max-h-[90vh] min-h-[300px] md:min-h-[460px]`}
        >
          <div
            className="flex items-center justify-between py-5 p-6 border-b-[1px] "
            style={{ borderColor: "#f4f4f4" }}
          >
            <h1 className="font-[700] text-[#2C2E7B] text-xl">{title}</h1>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex-grow max-h-[90vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

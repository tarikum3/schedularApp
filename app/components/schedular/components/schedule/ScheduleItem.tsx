"use client";
import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
import ModalComponent from "@components/schedular/components/ui/ModalComponent";
import {
  useDeleteScheduleMutation,
  Schedule,
} from "@/lib/admin/store/services/schedule.service";
import { ScheduleType, DayEnum } from "@prisma/client";
import { useTranslations } from "next-intl";

const DAYS = [
  { day: DayEnum.Monday, name: "M" },
  { day: DayEnum.Tuesday, name: "T" },
  { day: DayEnum.Wednesday, name: "W" },
  { day: DayEnum.Thursday, name: "Th" },
  { day: DayEnum.Friday, name: "F" },
  { day: DayEnum.Saturday, name: "Sa" },
  { day: DayEnum.Sunday, name: "Su" },
];

interface ScheduleItemProps {
  item: Schedule;
  version?: "full" | "mini";
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  item,
  version = "full",
}) => {
  const t = useTranslations("ScheduleItem"); // Use translations for this component
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (version === "mini")
    return (
      <div className="p-2 hover:bg-primary-100 rounded-lg transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-primary-900">{item.name}</p>
          </div>
          <div className="flex items-center space-x-1">
            <IconButton
              onClick={() => setModalOpen(true)}
              size="small"
              className="p-1"
              aria-label={t("edit")}
            >
              <ModeEditOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => deleteSchedule(item.id)}
              size="small"
              className="p-1"
              aria-label={t("delete")}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        {modalOpen && (
          <ModalComponent
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            titles={{ title: t("updateTitle") }}
            fullWidth={true}
          >
            <CreateSchedule item={item} />
          </ModalComponent>
        )}
      </div>
    );

  return (
    <div className="max-w-sm mx-auto bg-primary-0 text-primary shadow-sm rounded-lg overflow-hidden mb-3">
      <div className="flex flex-col sm:flex-row sm:items-center px-3 py-2 border">
        <div className="flex-auto mt-1 sm:mt-0 sm:ml-2 text-center sm:text-left">
          <p className="text-sm text-primary font-medium">{item.name}</p>
          <p className="text-xs leading-tight text-primary-600">
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </p>
          <div className="mt-1 flex space-x-1 justify-center sm:justify-start">
            {DAYS.map((dayItem) => (
              <span
                key={dayItem.day}
                className={`${
                  item.days.includes(dayItem.day)
                    ? "text-primary-0 bg-primary-500"
                    : "text-primary-500"
                } w-4 h-4 flex items-center justify-center text-center border border-primary-500 text-[10px] font-medium rounded-full`}
              >
                {dayItem.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-none flex items-center justify-center sm:justify-end mt-1 sm:mt-0">
          <span className="text-xs text-primary font-medium p-1 mr-1">
            {item.scheduleType.toLowerCase()}
          </span>
          <IconButton
            onClick={() => setModalOpen(true)}
            size="small"
            className="p-1"
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => deleteSchedule(item.id)}
            size="small"
            className="p-1"
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: t("updateTitle") }}
          fullWidth={true}
        >
          <CreateSchedule item={item} />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleItem;

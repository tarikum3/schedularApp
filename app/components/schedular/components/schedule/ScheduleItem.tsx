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
  const t = useTranslations("ScheduleItem");
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (version === "mini")
    return (
      <div className="p-2 hover:bg-primary-100 rounded-lg transition-colors duration-200">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-primary-900 truncate">
              {item.name}
            </p>
          </div>
          <div className="flex items-center space-x-1 shrink-0">
            <IconButton
              onClick={() => setModalOpen(true)}
              size="small"
              className="p-1"
              aria-label={t("UpdateSchedule")}
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
            titles={{ title: t("UpdateSchedule") }}
            fullWidth={true}
          >
            <CreateSchedule item={item} />
          </ModalComponent>
        )}
      </div>
    );

  return (
    <div className="w-full bg-primary-0 text-primary shadow-sm rounded-lg mb-3 overflow-hidden">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center px-3 py-2 border gap-2">
        <div className="flex-auto min-w-0">
          <p className="text-sm text-primary font-medium truncate">
            {item.name}
          </p>
          <p className="text-xs leading-tight text-primary-600 truncate">
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {DAYS.map((dayItem) => (
              <span
                key={dayItem.day}
                className={`${
                  item.days.includes(dayItem.day)
                    ? "text-primary-0 bg-primary-500"
                    : "text-primary-500"
                } w-4 h-4 flex items-center justify-center text-center border border-primary-500 text-[10px] font-medium rounded-full shrink-0`}
              >
                {dayItem.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-none flex items-center gap-1 sm:gap-0 self-end sm:self-auto">
          <span className="text-xs text-primary font-medium whitespace-nowrap shrink-0">
            {item.scheduleType.toLowerCase()}
          </span>
          <IconButton
            onClick={() => setModalOpen(true)}
            size="small"
            className="p-1"
            aria-label={t("UpdateSchedule")}
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
          titles={{ title: t("UpdateSchedule") }}
          fullWidth={true}
        >
          <CreateSchedule item={item} />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleItem;

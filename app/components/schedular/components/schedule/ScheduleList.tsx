"use client";
import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
import ScheduleItem from "@/app/components/schedular/components/schedule/ScheduleItem";
import ModalComponent from "@components/schedular/components/ui/ModalComponent";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { useTranslations } from "next-intl";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
const ScheduleList = () => {
  const t = useTranslations("ScheduleList");
  const [modalOpen, setModalOpen] = useState(false);

  // Destructure error and refetch from the query hook
  const {
    data: scheduledata,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetAllSchedulesQuery();

  const handleRetry = () => {
    refetch(); // This will retry the query
  };

  return (
    <div className="w-full p-4 h-full overflow-y-clip">
      <div className="text-xl font-bold mb-4 text-center">{t("title")}</div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-primary-0 bg-primary-500 hover:bg-primary-600 rounded-md shadow"
        >
          <AddOutlinedIcon />
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-32">
          <Tooltip title={t("retry")}>
            <IconButton color="error" onClick={handleRetry} size="large">
              <RefreshIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="p-2 space-y-1 h-full overflow-y-auto m-1">
          {scheduledata?.map((item) => (
            <ScheduleItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: t("CreateSchedule") }}
          fullWidth
        >
          <CreateSchedule />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleList;

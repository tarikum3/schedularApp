"use client";
import React from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import CreateSchedule from "@/app/components/schedular/schedule/CreateSchedule";
import ModalComponent from "@components/admin/components/ui/ModalComponent";

const ScheduleList: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <div className="w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
      <div className="text-xl font-bold mb-4 text-center">Schedules</div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setModalOpenCal(true)}
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow"
        >
          Calculate ED API
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md shadow"
        >
          <AddOutlinedIcon />
        </button>
      </div>
      <div className="p-2 space-y-2 h-80 overflow-y-auto border rounded-md">
        {scheduledata?.map((item) => (
          <ScheduleItem item={item} />
        ))}
      </div>

      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Create Schedule" }}
          fullWidth
        >
          <CreateSchedule />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleList;

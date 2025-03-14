// "use client";
// import React, { useEffect, useMemo, useState } from "react";

// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
// import ScheduleItem from "@/app/components/schedular/components/schedule/ScheduleItem";
// import ModalComponent from "@components/schedular/components/ui/ModalComponent";
// import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
// const ScheduleList = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const { data: scheduledata } = useGetAllSchedulesQuery();
//   console.log("scheduledataa", scheduledata);
//   return (
//     <div className="w-full  p-4 bg-primary-0 rounded-lg shadow-md">
//       <div className="text-xl font-bold mb-4 text-center">Schedules</div>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setModalOpen(true)}
//           className="px-4 py-2 text-primary-0 bg-green-500 hover:bg-green-600 rounded-md shadow"
//         >
//           <AddOutlinedIcon />
//         </button>
//       </div>
//       {/* <div className="p-2 space-y-2 h-80 overflow-y-auto border rounded-md">
//         {scheduledata?.map((item) => (
//           <ScheduleItem item={item} />
//         ))}
//       </div> */}

//       <div className=" p-2 space-y-1 h-[400px]  overflow-y-auto m-1 ">
//         {scheduledata?.map((item) => {
//           //  return ScheduleItem(item as any);
//           return <ScheduleItem item={item}></ScheduleItem>;
//         })}
//       </div>

//       {modalOpen && (
//         <ModalComponent
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           titles={{ title: "Create Schedule" }}
//           fullWidth
//         >
//           <CreateSchedule />
//         </ModalComponent>
//       )}
//     </div>
//   );
// };

// export default ScheduleList;

"use client";
import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
import ScheduleItem from "@/app/components/schedular/components/schedule/ScheduleItem";
import ModalComponent from "@components/schedular/components/ui/ModalComponent";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";
import { useTranslations } from "next-intl";

const ScheduleList = () => {
  const t = useTranslations("ScheduleList"); // Use translations for this component
  const [modalOpen, setModalOpen] = useState(false);
  const { data: scheduledata } = useGetAllSchedulesQuery();

  return (
    <div className="w-full p-4 bg-primary-0 rounded-lg shadow-md">
      <div className="text-xl font-bold mb-4 text-center">{t("title")}</div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-primary-0 bg-green-500 hover:bg-green-600 rounded-md shadow"
        >
          <AddOutlinedIcon />
        </button>
      </div>
      <div className="p-2 space-y-1 h-[400px] overflow-y-auto m-1">
        {scheduledata?.map((item) => (
          <ScheduleItem key={item.id} item={item} />
        ))}
      </div>

      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: t("createTitle") }}
          fullWidth
        >
          <CreateSchedule />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleList;

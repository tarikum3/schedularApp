// "use client";
// import React, { useState } from "react";

// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
// import { IconButton } from "@mui/material";

// import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
// import ModalComponent from "@components/admin/components/ui/ModalComponent";

// import {
//   useDeleteScheduleMutation,
//   Schedule,
// } from "@/lib/admin/store/services/schedule.service";

// const ScheduleItem: React.FC<{ item: Schedule }> = ({ item }) => {
//   //const ScheduleItem = (item: any) => {
//   const [deleteSchedule] = useDeleteScheduleMutation();
//   const [modalOpen, setModalOpen] = useState(false);
//   return (
//     <div className="max-w-sm mx-auto bg-white  text-primary shadow-lg rounded-lg overflow-hidden">
//       <div className="flex sm:flex sm:items-center px-6 py-4 border">
//         <div className="flex-auto mt-1 sm:mt-0 sm:ml-4 text-center sm:text-left">
//           <p className="text-sm text-primary font-medium">{item.name}</p>
//           <p className="text-sm leading-tight text-gray-600">
//             {/* {format(new Date(date), "d")} */}
//           </p>
//           <div className="mt-1 flex space-x-1">
//             {DAYS.map((dayItem) => {
//               return (
//                 <span
//                   className={` ${
//                     item.days.includes(dayItem.day)
//                       ? "text-white bg-blue-500"
//                       : "text-blue-500"
//                   } w-4 h-4 flex items-center justify-center text-center border border-blue-500 text-xs font-medium rounded-full px-1 py-1 `}
//                 >
//                   {dayItem.name}
//                 </span>
//               );
//             })}
//           </div>
//         </div>
//         <div className="flex-none">
//           <span className="text-xs text-primary font-medium p-2 mr-1">
//             {item.isWorkingDay ? "open" : "closed"}
//           </span>

//           <IconButton
//             onClick={() => {
//               setModalOpen(true);
//               // setUpdateData(row.row.original);
//               // setcurrentId(row.row.original.id);
//             }}
//           >
//             <ModeEditOutlineOutlinedIcon />
//           </IconButton>

//           <IconButton
//             onClick={() => {
//               // setViewDetail(row?.getValue().id)
//               deleteSchedule(item.id);
//             }}
//           >
//             <DeleteOutlineOutlinedIcon />
//           </IconButton>
//         </div>
//       </div>
//       {modalOpen && (
//         <ModalComponent
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           titles={{ title: "Update Schedule" }}
//           //widthLoadingOnSubmit={false}
//           fullWidth={true}
//         >
//           <CreateSchedule item={item}></CreateSchedule>
//         </ModalComponent>
//       )}
//     </div>
//   );
// };
// export default ScheduleItem;

"use client";
import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import CreateSchedule from "@/app/components/schedular/components/schedule/CreateSchedule";
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import {
  useDeleteScheduleMutation,
  Schedule,
} from "@/lib/admin/store/services/schedule.service";
import { ScheduleType, DayEnum } from "@prisma/client"; // Import enums from Prisma

// Define the DAYS array to map DayEnum values to their display names
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
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item }) => {
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [modalOpen, setModalOpen] = useState(false);

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(); // Customize the format as needed
  };

  return (
    <div className="max-w-sm mx-auto bg-white text-primary shadow-lg rounded-lg overflow-hidden">
      <div className="flex sm:flex sm:items-center px-6 py-4 border">
        <div className="flex-auto mt-1 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-sm text-primary font-medium">{item.name}</p>
          <p className="text-sm leading-tight text-gray-600">
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </p>
          <div className="mt-1 flex space-x-1">
            {DAYS.map((dayItem) => (
              <span
                key={dayItem.day}
                className={`${
                  item.days.includes(dayItem.day)
                    ? "text-white bg-blue-500"
                    : "text-blue-500"
                } w-4 h-4 flex items-center justify-center text-center border border-blue-500 text-xs font-medium rounded-full px-1 py-1`}
              >
                {dayItem.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-none">
          <span className="text-xs text-primary font-medium p-2 mr-1">
            {item.scheduleType.toLowerCase()} {/* Display schedule type */}
          </span>

          <IconButton onClick={() => setModalOpen(true)}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>

          <IconButton onClick={() => deleteSchedule(item.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      </div>
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Update Schedule" }}
          fullWidth={true}
        >
          <CreateSchedule item={item} />
        </ModalComponent>
      )}
    </div>
  );
};

export default ScheduleItem;

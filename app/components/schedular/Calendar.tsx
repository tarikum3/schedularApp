"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  parse,
  setYear,
  getYear,
  parseISO,
} from "date-fns";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";

import CreateSchedule from "@/app/components/schedular/CreateSchedule";
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import { TextField, Button } from "@mui/material";
import { useGetDayByYearQuery } from "@/lib/admin/store/services/day.service";
import { useGetAllSchedulesQuery } from "@/lib/admin/store/services/schedule.service";

import { useDeleteScheduleMutation } from "@/lib/admin/store/services/schedule.service";

const DAYS = [
  { day: "Sunday", name: "S" },
  { day: "Monday", name: "M" },
  { day: "Tuesday", name: "T" },
  { day: "Wednesday", name: "W" },
  { day: "Thursday", name: "T" },
  { day: "Friday", name: "F" },
  { day: "Saturday", name: "S" },
];

const ScheduleItem: React.FC<{ item?: any }> = ({ item }) => {
  //const ScheduleItem = (item: any) => {
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="max-w-sm mx-auto bg-white  text-primary shadow-lg rounded-lg overflow-hidden">
      <div className="flex sm:flex sm:items-center px-6 py-4 border">
        <div className="flex-auto mt-1 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-sm text-primary font-medium">{item.name}</p>
          <p className="text-sm leading-tight text-gray-600">
            {/* {format(new Date(date), "d")} */}
          </p>
          <div className="mt-1 flex space-x-1">
            {DAYS.map((dayItem) => {
              return (
                <span
                  className={` ${
                    item.days.includes(dayItem.day)
                      ? "text-white bg-blue-500"
                      : "text-blue-500"
                  } w-4 h-4 flex items-center justify-center text-center border border-blue-500 text-xs font-medium rounded-full px-1 py-1 `}
                >
                  {dayItem.name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex-none">
          <span className="text-xs text-primary font-medium p-2 mr-1">
            {item.isWorkingDay ? "open" : "closed"}
          </span>

          <IconButton
            onClick={() => {
              setModalOpen(true);
              // setUpdateData(row.row.original);
              // setcurrentId(row.row.original.id);
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              // setViewDetail(row?.getValue().id)
              deleteSchedule(item.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      </div>
      {modalOpen && (
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          titles={{ title: "Update Schedule" }}
          //widthLoadingOnSubmit={false}
          fullWidth={true}
        >
          <CreateSchedule item={item}></CreateSchedule>
        </ModalComponent>
      )}
    </div>
  );
};

// const Calendar: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [selectOptionValue, setSelectOptionValue] = useState(
//     format(new Date(), "yyyy")
//   );
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalOpenCal, setModalOpenCal] = useState(false);
//   const { data } = useGetDayByYearQuery(format(new Date(), "yyyy"));
//   const { data: scheduledata } = useGetAllSchedulesQuery();
//   const [mappedData, setMappedData] = useState<any>();

//   const generateYears = (startYear: number, endYear: number): string[] => {
//     const years = [];
//     for (let year = startYear; year <= endYear; year++) {
//       years.push(format(new Date(year, 0, 1), "yyyy"));
//     }
//     return years;
//   };

//   const years = generateYears(2022, 2100);

//   console.log("yearsssdata", data);
//   console.log("scheduledata", scheduledata);

//   useEffect(() => {
//     if ((data as any)?.length && (data as any)?.length > 0) {
//       let mapped: any = {};
//       // mapped = (data as any).map((item: any) => item);

//       // mapped = (data as any).reduce((acc: any, obj: any) => {
//       //   const date = obj.date; // Use the entire date string as the key
//       //   acc[date] = obj;
//       //   //  acc[obj.date] = obj;
//       //   return acc;
//       // });
//       (data as any).forEach((element: any) => {
//         let mapitem = format(new Date(element.date), "yyyy-MM-dd");
//         mapped[mapitem] = element;
//       });
//       setMappedData(mapped);
//     }
//   }, [data]);

//   console.log("yearsssdatamappedData", mappedData);
//   console.log("yearsssdataselectedDate", selectedDate);

//   useEffect(() => {
//     //if(){
//     const newDate = setYear(currentMonth, selectOptionValue as any);
//     // if( newDate?.getFullYear >currentMonth.getFullYear){
//     setCurrentMonth(newDate);
//     // console.log("selectOptionValuenewDate", newDate);
//     // }

//     //  }
//   }, [selectOptionValue]);

//   const renderHeader = () => {
//     const dateFormat = "MMMM ";
//     return (
//       <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
//         <div className="cursor-pointer" onClick={prevMonth}>
//           <span className="text-lg m-1">{"<"}</span>
//         </div>
//         <div className="flex items-center">
//           <span>{format(currentMonth, dateFormat)}</span>
//           <select
//             name="select option"
//             value={selectOptionValue}
//             onChange={(e) => setSelectOptionValue(e.target.value)}
//             className="focus:outline-none focus:ring-0 p-1 bg-white border border-gray-200 rounded h-10 ml-3"
//           >
//             {years.map((option) => (
//               <option key={option} value={option} id={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="cursor-pointer" onClick={nextMonth}>
//           <span className="text-lg m-1">{">"}</span>
//         </div>
//       </div>
//     );
//   };

//   const renderDays = () => {
//     const dateFormat = "eeee";
//     const days = [];
//     const startDate = startOfWeek(currentMonth);

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div className="flex justify-center p-2 text-gray-500" key={i}>
//           {format(addDays(startDate, i), dateFormat)}
//         </div>
//       );
//     }

//     return <div className="grid grid-cols-7">{days}</div>;
//   };

//   const renderCells = () => {
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);
//     const dateFormat = "d";
//     const rows = [];
//     let days = [];
//     let day = startDate;
//     let formattedDate = "";

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         formattedDate = format(day, dateFormat);
//         const cloneDay = day;
//         let forrmm = format(new Date(cloneDay), "yyyy-MM-dd");

//         days.push(
//           <div
//             className={`p-4 text-center border border-gray-200 cursor-pointer ${
//               !isSameMonth(day, monthStart)
//                 ? "text-gray-300"
//                 : isSameDay(day, selectedDate)
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-gray-100"
//             }`}
//             key={day.toString()}
//             onClick={() => onDateClick(cloneDay)}
//           >
//             <div className="flex flex-col">
//               <span className="text-sm">
//                 {mappedData && mappedData[forrmm]
//                   ? mappedData[forrmm].isWorkingDay
//                     ? "open"
//                     : "closed"
//                   : "not scheduled"}
//               </span>
//               <span>{formattedDate}</span>
//             </div>
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div className="grid grid-cols-7" key={day.toString()}>
//           {days}
//         </div>
//       );
//       days = [];
//     }
//     return <div>{rows}</div>;
//   };

//   const onDateClick = (day: Date) => {
//     setSelectedDate(day);
//   };

//   const nextMonth = () => {
//     let dateNext = addMonths(currentMonth, 1);
//     setCurrentMonth(dateNext);
//     let year = dateNext.getFullYear();
//     if (year != (selectOptionValue as any)) {
//       setSelectOptionValue(year as any);
//     }
//   };

//   const prevMonth = () => {
//     let datePrev = subMonths(currentMonth, 1);
//     setCurrentMonth(datePrev);
//     let year = datePrev.getFullYear();
//     if (year != (selectOptionValue as any)) {
//       setSelectOptionValue(year as any);
//     }
//   };

//   return (
//     <div className="flex flex-wrap md:flex-nowrap m-10 space-x-2">
//       <div className="w-full md:w-1/2">
//         {renderHeader()}
//         {renderDays()}
//         {renderCells()}
//       </div>
//       <div className="text-2xl w-full md:w-1/2 text-center font-bold p-2 h-20">
//         <div className="text-xl font-bold mb-4">Schedules</div>
//         <div className="flex justify-between mb-5">
//           <Button
//             variant="outlined"
//             disableElevation
//             onClick={() => setModalOpenCal(true)}
//             className="text-sm"
//           >
//             Calculate ED API
//           </Button>
//           <Button
//             variant="outlined"
//             disableElevation
//             onClick={() => setModalOpen(true)}
//             className="text-sm"
//           >
//             <AddOutlinedIcon />
//           </Button>
//         </div>
//         <div className="p-2 space-y-1 h-[400px] overflow-y-auto">
//           {scheduledata?.map((item) => (
//             <ScheduleItem item={item} />
//           ))}
//         </div>

//         {modalOpen && (
//           <ModalComponent
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//             titles={{ title: "Create Schedule" }}
//             fullWidth
//           >
//             <CreateSchedule />
//           </ModalComponent>
//         )}
//       </div>
//     </div>
//   );
// };

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectOptionValue, setSelectOptionValue] = useState(
    format(new Date(), "yyyy")
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCal, setModalOpenCal] = useState(false);
  const { data } = useGetDayByYearQuery(format(new Date(), "yyyy"));
  const { data: scheduledata } = useGetAllSchedulesQuery();
  const [mappedData, setMappedData] = useState<any>();

  const generateYears = (startYear: number, endYear: number): string[] => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(format(new Date(year, 0, 1), "yyyy"));
    }
    return years;
  };

  const years = generateYears(2022, 2100);

  useEffect(() => {
    if ((data as any)?.length && (data as any)?.length > 0) {
      let mapped: any = {};
      (data as any).forEach((element: any) => {
        let mapitem = format(new Date(element.date), "yyyy-MM-dd");
        mapped[mapitem] = element;
      });
      setMappedData(mapped);
    }
  }, [data]);

  useEffect(() => {
    const newDate = setYear(currentMonth, selectOptionValue as any);
    setCurrentMonth(newDate);
  }, [selectOptionValue]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
        <button
          className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={prevMonth}
        >
          {"<"}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">
            {format(currentMonth, "MMMM")}
          </span>
          <select
            value={selectOptionValue}
            onChange={(e) => setSelectOptionValue(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-xl px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={nextMonth}
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-semibold text-gray-600 py-2" key={i}>
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        let formattedDate = format(day, "d");
        let formattedFullDate = format(day, "yyyy-MM-dd");

        days.push(
          <div
            key={day.toString()}
            className={`p-4 text-center border cursor-pointer transition-all duration-200 ${
              !isSameMonth(day, monthStart)
                ? "text-gray-300"
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium">
                {mappedData && mappedData[formattedFullDate]
                  ? mappedData[formattedFullDate].isWorkingDay
                    ? "Open"
                    : "Closed"
                  : "N/A"}
              </span>
              <span className="text-lg font-semibold">{formattedDate}</span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    let dateNext = addMonths(currentMonth, 1);
    setCurrentMonth(dateNext);
    let year = dateNext.getFullYear();
    if (year != (selectOptionValue as any)) {
      setSelectOptionValue(year as any);
    }
  };

  const prevMonth = () => {
    let datePrev = subMonths(currentMonth, 1);
    setCurrentMonth(datePrev);
    let year = datePrev.getFullYear();
    if (year != (selectOptionValue as any)) {
      setSelectOptionValue(year as any);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center space-x-4 p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-md">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
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
    </div>
  );
};

export default Calendar;

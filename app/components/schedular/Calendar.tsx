'use client';
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
import "./style.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
 
import CreateSchedule from "@/app/components/schedular/CreateSchedule";
import ModalComponent from "@components/admin/components/ui/ModalComponent";
import { TextField, Button } from "@mui/material";
import { useGetDayByYearQuery } from "services/day.service";
import {
  useGetAllSchedulesQuery,
  useCalculateEnddateMutation,
} from "services/schedule.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDeleteScheduleMutation } from "services/schedule.service";
import { useSelector } from "react-redux";


const DAYS = [
  { day: "Sunday", name: "S" },
  { day: "Monday", name: "M" },
  { day: "Tuesday", name: "T" },
  { day: "Wednesday", name: "W" },
  { day: "Thursday", name: "T" },
  { day: "Friday", name: "F" },
  { day: "Saturday", name: "S" },
];

const CalculateEnddate: React.FC<{ item?: any }> = ({ item }) => {
  //const ScheduleItem = (item: any) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<any>();

  const [query, setQuery] = useState<any>({ startDate: null, duration: null });
  const [calculateEnddate] = useCalculateEnddateMutation();

  const [deadline, setDeadline] = useState<any>();

  console.log("calend", deadline);
  console.log("calendquery", query);
  console.log("startDate", startDate);

  function formatCustomDate(dateString: string) {
    // Parse the input date string into a Date object
    const date = parseISO(dateString);

    // Format the date into the desired string format
   // return format(date, "MMMM d, yyyy h 'hours' m 'minutes' a");
   return format(date, "MMMM d, yyyy h:mm a");
  }

  useEffect(() => {
    const fun = async () => {
      const response = await calculateEnddate(query);
      if ((response as any).data) {
        // console.log(
        //   "calendresponsed",
        //   formatCustomDate((response as any).data)
        // );
        let formattt = formatCustomDate((response as any).data);
        setDeadline(formattt);
      } else {
        //  let formattt = formatCustomDate((response as any).data);
        setDeadline("the start date or end date out of calender date ");
      }
    };
    if (query.startDate) {
      fun();
    }
  }, [query]);
  return (
    <div className="">
      <div className="text-dark-500  space-y-10 p-5 m-5">
        <div className="flex flex-col">
          <div className="flex flex-row m-2 p-1 space-x-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {" "}
              <DatePicker
                label="Startdate"
                value={startDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setStartDate((prev) => {
                      return new Date(newValue);
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    // fullWidth
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <div className="flex items-center space-x-2 ">
              {" "}
              <strong> duration </strong>
              <input
                type="number"
                className=" w-10 text-grey-darkest outline-none h-full "
                placeholder=""
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />{" "}
              <span>min</span>
            </div>
            <Button
              variant="contained"
              disabled={!startDate || !duration}
              onClick={() => {
                setQuery((prev: any) => {
                  return { startDate, duration };
                });
              }}
              sx={{
                background: "#2C2E7B !important",
                borderColor: "#2C2E7B",
                color: "#fff",
                fontWeight: 800,
                padding: "12px 1.2rem 10px",
                borderRadius: 1,
              }}
            >
              cal
            </Button>
          </div>
          <p className="text-red-500 text-sm  m-1">{deadline}</p>
        </div>
      </div>
    </div>
  );
};

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
          titles={{ title: "Update Schedule",  }}
          //widthLoadingOnSubmit={false}
          fullWidth={true}
        >
          <CreateSchedule item={item}></CreateSchedule>
        </ModalComponent>
      )}
    </div>
  );
};

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

  console.log("yearsssdata", data);
  console.log("scheduledata", scheduledata);

 

  useEffect(() => {
    if ((data as any)?.length && (data as any)?.length > 0) {
      let mapped: any = {};
      // mapped = (data as any).map((item: any) => item);

      // mapped = (data as any).reduce((acc: any, obj: any) => {
      //   const date = obj.date; // Use the entire date string as the key
      //   acc[date] = obj;
      //   //  acc[obj.date] = obj;
      //   return acc;
      // });
      (data as any).forEach((element: any) => {
        let mapitem = format(new Date(element.date), "yyyy-MM-dd");
        mapped[mapitem] = element;
      });
      setMappedData(mapped);
    }
  }, [data]);

  console.log("yearsssdatamappedData", mappedData);
  console.log("yearsssdataselectedDate", selectedDate);

  useEffect(() => {
    //if(){
    const newDate = setYear(currentMonth, selectOptionValue as any);
    // if( newDate?.getFullYear >currentMonth.getFullYear){
    setCurrentMonth(newDate);
    // console.log("selectOptionValuenewDate", newDate);
    // }

    //  }
  }, [selectOptionValue]);

  const renderHeader = () => {
    //const dateFormat = "MMMM yyyy";
    const dateFormat = "MMMM ";
    return (
      <div className="header row flex-middle ">
        <div className="col col-start  ">
          <div onClick={prevMonth} className="flex flex-col justify-center h-full  ">
            <span className="cursor-pointer m-2"> {"<"}</span>
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
          <select
            name={"select option"}
            value={selectOptionValue}
            onChange={(e) => setSelectOptionValue(e.target.value)}
            className="focus:outline-none focus:ring-0 p-1 bg-white border-x-1 border-y-1 border-slate-200 rounded h-[40px]"
          >
            {/* <option
              //disabled={true}
              value=""
            >
              all
            </option> */}
            {years.map((option: any) => (
              <option value={option} id={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="flex flex-col justify-center h-full  ">
            <span className="cursor-pointer m-1 ">{">"}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eeee";
    const days = [];

    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows: JSX.Element[] = [];

    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        let forrmm = format(new Date(cloneDay), "yyyy-MM-dd");
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day.toString()}
            onClick={() => {
              // onDateClick(parse(cloneDay.toString(), "yyyy-MM-dd", new Date()));
              onDateClick(cloneDay);
              // let forrmm = format(new Date(cloneDay), "yyyy-MM-dd");
              // console.log("forrmm", forrmm);
              // let forrmm2 = mappedData[forrmm];
              // console.log("forrmm2", forrmm2);
              // console.log("cloneDaycurrentMonth", currentMonth);
            }}
          >
            <div className="flex flex-col justify-center border h-full">
              <span className="text-xs overflow-hidden whitespace-wrap overflow-ellipsis">
                {mappedData && mappedData[forrmm]
                  ? !mappedData[forrmm].scheduleId ? "not scheduled" :mappedData[forrmm].isWorkingDay
                    ? "open"
                    : "closed"
                  : "not scheduled"}
              </span>
              <span className="text-base font-medium">{formattedDate}</span>
            </div>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    console.log("yearsssselectedDatenoDate", day);
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
    <div className="flex flex-wrap md:flex-nowrap m-10 space-x-2 text-primary bg-white">
      <div className="calendar !w-full  md:!w-1/2">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      <div className="text-2xl w-full md:w-1/2 text-center font-bold p-2 h-20">
        <div className="text-xl text-center font-bold m-2 p-3">Schedules</div>
        <div className=" flex justify-between text-end m-5 ">
          <Button
            variant="outlined"
            disableElevation
            onClick={() => {
              setModalOpenCal(true);
            }}
            style={{ textTransform: "none" }}
          >
            <span>Calculate ED API </span>
          </Button>
          <Button
            className="  text-end "
            variant="outlined"
            disableElevation
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <AddOutlinedIcon />
          </Button>
        </div>
        <div className=" p-2 space-y-1 h-[400px]  overflow-y-auto m-1">
          {scheduledata?.map((item) => {
            //  return ScheduleItem(item as any);
            return <ScheduleItem item={item}></ScheduleItem>;
          })}
        </div>
        {modalOpenCal && (
          <ModalComponent
            open={modalOpenCal}
            onClose={() => setModalOpenCal(false)}
            titles={{ title: "Calculate ED API" }}
           // widthLoadingOnSubmit={false}
            fullWidth={true}
          >
            <CalculateEnddate></CalculateEnddate>
          </ModalComponent>
        )}

        {modalOpen && (
          <ModalComponent
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            titles={{ title: "Create Schedule",  }}
           // widthLoadingOnSubmit={false}
            fullWidth={true}
          >
            <CreateSchedule></CreateSchedule>
          </ModalComponent>
        )}
      </div>
    </div>
  );
};

export default Calendar;

// Enkutatash (New Year) - Meskerem 1 (September 11 or 12 in the Gregorian calendar)
// Meskel (Finding of the True Cross) - Meskerem 17 (September 27 in the Gregorian calendar)
// Genna (Ethiopian Christmas) - Tahsas 29 (January 7 in the Gregorian calendar)
// Timkat (Epiphany) - Tir 11 (January 19 in the Gregorian calendar)
// Adwa Victory Day - Yekatit 23 (March 2 in the Gregorian calendar)
// Ethiopian Good Friday - Movable, based on the Ethiopian Orthodox Church's calculations
// Fasika (Ethiopian Easter) - Movable, based on the Ethiopian Orthodox Church's calculations
// Patriots' Victory Day - Miazia 27 (May 5 in the Gregorian calendar)
// Labour Day - Miazia 23 (May 1 in the Gregorian calendar)
// Derg Downfall Day - Ginbot 20 (May 28 in the Gregorian calendar)
// Eid ul-Fitr - Movable, based on the Islamic lunar calendar
// Eid ul-Adha - Movable, based on the Islamic lunar calendar

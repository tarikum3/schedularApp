'use client';
import React, { useEffect, useState, useCallback } from "react";
import {
 
  addDays,

} from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch, { SwitchProps } from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
} from "services/schedule.service";
//import { useNavigate,  } from "react-router-dom";

const CreateSchedule: React.FC<{ item?: any }> = ({ item }) => {
  const [days, setDays] = useState<String[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));

  const [startingTime, setStartingTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
 

  const [startingTimes, setStartingTimes] = useState<Date[]>([]);
  const [endTimes, setEndTimes] = useState<Date[]>([]);
  const [times, setTimes] = useState<String[]>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [name, setName] = useState("");
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [errors, setErrors] = useState({
    timeerror: "",
    nameerror: "",
    days: "",
    durationerror: "",
  });

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const navigate = useNavigate();
  const formatDateAmPm = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, "0");
    return `${hoursStr}:${minutes} ${ampm}`;
  };
  const formatDate = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const checkboxChanged = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setDays((prev) => {
        return [...prev, value];
      });
    } else {
      setDays((prev) => {
        return prev.filter((day) => day !== value);
      });
    }
  };
  useEffect(() => {
    if (item) {
      setName(item.name);
      setStartDate(new Date(item.startDate));
      setEndDate(new Date(item.endDate));
      setDays(item.days);
      setIsClosed(!item.isWorkingDay);
      setStartingTimes([
        ...item.startTimes.map((date: any) => {
          let dateform = new Date(date);
          return dateform;
        }),
      ]);
      setEndTimes([
        ...item.endTimes.map((date: any) => {
          let dateform = new Date(date);
          return dateform;
        }),
      ]);
      setTimes([
        ...item.endTimes.map((dateitem: any, index: any) => {
          // const st = formatDate(new Date(item.startTimes[index]));
          // const ed = formatDate(new Date(dateitem));
        
              const st = formatDateAmPm(new Date(item.startTimes[index]));
          const ed = formatDateAmPm(new Date(dateitem));
          const formatted = `From ${st} to ${ed}`;
          return formatted;
        }),
      ]);
    }
  }, [item]);
  //useEffect(() => {}, []);

  
  console.log("startingTime", startingTime);
  console.log("startingTimes", startingTimes);
  //console.log("formatDateAmPm",  formatDateAmPm(new Date("2024-07-24T11:25:45.539Z" )));
  const handleAddTimes = () => {
    if (
      startingTimes.length == endTimes.length &&
      startingTime != null &&
      endTime != null
    ) {
      // const st = formatDate(startingTime);
      // const ed = formatDate(endTime);
            const st = formatDateAmPm(startingTime);
      const ed = formatDateAmPm(endTime);
      
      console.log("startingTimeafter", startingTime);
      const formatted = `From ${st} to ${ed}`;
      setTimes((prev) => [...prev, formatted]);
      setStartingTimes((prev) => [...prev, startingTime]);
      setEndTimes((prev) => [...prev, endTime]);
      setStartingTime(null);
      setEndTime(null);
    }
  };

  const deleteTimes = (id: Number) => {
    setTimes((prev) => {
      return prev.filter((value, index) => index !== id);
    });
    setStartingTimes((prev) => {
      return prev.filter((value, index) => index !== id);
    });
    setEndTimes((prev) => {
      return prev.filter((value, index) => index !== id);
    });
  };
 
  function extractHourAndMinute(dateS: Date): string {
    const date = new Date(dateS);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const scheduleHandler = async () => {
    let proceed = true;
    setErrors((prev) => {
      return { ...prev, nameerror: "name field can not be empty" };
    });

    if (!name) {
      setErrors((prev) => {
        return { ...prev, nameerror: "name field can not be empty" };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          nameerror: " ",
        };
      });
    }
    if (!startDate) {
      setErrors((prev) => {
        return {
          ...prev,
          durationerror: "durationerror field can not be empty",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          durationerror: " ",
        };
      });
    }
    if (days.length < 1) {
      setErrors((prev) => {
        return {
          ...prev,
          days: "at least one day must be selected",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          days: " ",
        };
      });
    }
    if (startDate > endDate) {
      setErrors((prev) => {
        return {
          ...prev,
          durationerror: "end date should be greater than start date ",
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          durationerror: " ",
        };
      });
    }

    if (proceed) {
      if (item) {
        const response: any = await updateSchedule({
          id: item?.id,
          name: name,
          startDate: startDate,
          endDate: endDate,
          days: days,
          startTimes: startingTimes,
          endTimes: endTimes,
     
          isWorkingDay: isClosed ? false : true,
        } as any);
        if (response?.data) {
         // navigate(0);
        }
      } else {
        const response: any = await createSchedule({
          name: name,
          startDate: startDate,
          endDate: endDate,
          days: days,
          startTimes: startingTimes,
          endTimes: endTimes,
          
          isWorkingDay: isClosed ? false : true,
        });
        console.log("createSchedulesresponse", response);
        if (response?.data) {
          navigate(0);
        }
      }
    }
  };
  console.log("updateitem", item);
  return (
    <div className="">
      <div className="text-primary space-y-10 p-5 m-5">
        <div className="flex flex-col ">
          <strong className="">Schedule name</strong>
          <div className=" m-2 p-1 space-x-1 text-sm">
       
            <TextField
              fullWidth
              label="Schedule Name"
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
            <p className="text-red-500 text-sm  m-1">{errors.nameerror}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <strong>ON</strong>
          <div className="flex flex-row m-2 p-1 space-x-1 text-sm">
            {weekdays.map((day, index) => {
              return (
                <div className=" ml-2 flex flex-wrap" key={day}>
                  <input
                    id={day}
                    type="checkbox"
                    value={day}
                    checked={days.includes(day)}
                    onClick={(e) => checkboxChanged(e)}
                  />
                  <label className="ml-2" htmlFor={day}>
                    {day}
                  </label>
                </div>
              );
            })}
          </div>
          <p className="text-red-500 text-sm  m-1">{errors.days}</p>
        </div>

        <div className="flex flex-col">
          <strong>Duration</strong>
          <div className="flex flex-row m-2 p-1 space-x-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {" "}
              <DatePicker
                label="Startdate"
                value={startDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setStartDate(new Date(new Date(newValue)));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enddate"
                value={endDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setEndDate(new Date(newValue));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
              
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <p className="text-red-500 text-sm  m-1">{}</p>
        </div>

        <div>
          <strong>Working hours</strong>
          <div className="flex flex-row m-2 p-1 space-x-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Starting Time"
                value={startingTime}
                onChange={(newValue) => {
                  if (newValue) {
                    setStartingTime(new Date(newValue));
                    //  setStartingTimes((prev) => [...prev, new Date(newValue)]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
           
                  />
                )}
              />{" "}
            </LocalizationProvider>{" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="EndTime"
                value={endTime}
                onChange={(newValue) => {
                  if (newValue) {
                    setEndTime(new Date(newValue));
                    //  setEndTimes((prev) => [...prev, new Date(newValue)]);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              disableElevation
              disabled={
                startingTime == null ||
                endTime == null ||
                endTime.getTime() < startingTime.getTime()
              }
              sx={{
                background: "#2C2E7B !important",
                borderColor: "#2C2E7B",
                color: "#fff",
                fontWeight: 800,
                padding: "12px 1.2rem 10px",
                borderRadius: 1,
              }}
              onClick={handleAddTimes}
            >
              <AddOutlinedIcon />
            </Button>
          </div>
          <p className="text-red-500 text-sm  m-1"> {endTime&&startingTime&&(endTime?.getTime() < startingTime?.getTime())?"end time should be greater than start time hint: 8:00 am - 11:59 am morning ,1:00 pm - 5:00 pm afternoon":''}</p>
          <div className="flex flex-col m-2 p-1">
            {times.map((item, index) => (
              <div className="flex flex-center items-center">
                <span
                  key={index}
                  className=" text-md "
                  //  onClick={() => handleClick(index)}
                  // style={{ cursor: "pointer", display: "block", margin: "5px 0" }}
                >
                  {item}
                </span>
                <span className="text-xs">
                  <IconButton
                    onClick={() => {
                      deleteTimes(index);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </div>
            ))}
          </div>
         
        </div>

   

        <div className="flex justify-end text-md m-2 p-1">
          <Switch
            {...{
              inputProps: { "aria-label": "is Closed" },
              // title: "is Holiday",
            }}
            checked={isClosed} // Control the checked state of the switch
            onChange={(e) => setIsClosed(e.target.checked)}
            // defaultChecked
            size="small"
          />
          <label>is Closed</label>
        </div>

        <div className="flex text-sm">
          <Button
            variant="contained"
            //  disabled={}
            onClick={() => {
              scheduleHandler();
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
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;

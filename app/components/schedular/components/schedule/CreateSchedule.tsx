"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  SchedulePayload,
  Schedule,
} from "@/lib/admin/store/services/schedule.service";

import { useTranslations } from "next-intl";

// Define the schedule types and days of the week
const scheduleTypeList = ["MEETING", "APPOINTMENT", "PERSONAL"];
const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Schema for form validation
const schema = z.object({
  name: z.string().nonempty("Schedule Name is required."),
  startDate: z.date(),
  endDate: z.date(),
  scheduleType: z.string().nonempty("Schedule Type is required."),
  days: z.array(z.string()).optional(),
});

// Default form values
const defaultValues = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  scheduleType: "",
  days: [],
};

const CreateSchedule: React.FC<{ item?: Schedule }> = ({ item }) => {
  const t = useTranslations("CreateSchedule"); // Use translations for this component
  const { handleSubmit, control, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  console.log("resuphhjkerrors", errors);
  // Handle form submission
  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log("resuphhjk", "hjk");
    try {
      if (item) {
        const res = await updateSchedule({ id: item.id, ...data });
        console.log("res", res);
      } else {
        const res = await createSchedule(data as any);
        console.log("resup", res);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Get translated days of the week
  const translatedDays = daysList.map((day) => ({
    value: day,
    label: t(`daysOfWeek.${day}`), // Use the translation for each day
  }));

  // Get translated schedule types
  const translatedScheduleTypes = scheduleTypeList.map((type) => ({
    value: type,
    label: t(`scheduleType.${type}`), // Use the translation for each type
  }));

  return (
    <div>
      <form
        className="w-full text-primary space-y-10 p-5 m-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("Name")}
              variant="outlined"
              error={!!errors.name}
              helperText={errors?.name?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Start Date Field */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label={t("StartDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        {/* End Date Field */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label={t("EndDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        {/* Schedule Type Field */}
        {/* <Controller
            name="scheduleType"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={translatedScheduleTypes}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("Type")}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
                onChange={(_, value) => field.onChange(value?.value)}
              />
            )}
          /> */}
        <Controller
          name="scheduleType"
          control={control}
          render={({ field }) => {
            // Find the selected option based on the field value
            // const selectedOption = translatedScheduleTypes.find(
            //   (option) => option.value === field.value
            // );

            return (
              <Autocomplete
                {...field}
                options={scheduleTypeList}
                getOptionLabel={(option) => option}
                //value={selectedOption || null} // Ensure the value is an object or null
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("Type")}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
                onChange={(_, value) => {
                  // Update the field value with the selected option's value
                  // field.onChange(value ? value.value : "");
                  field.onChange(value ? value : "");
                }}
              />
            );
          }}
        />
        {/* Days Field */}
        <Controller
          name="days"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={daysList}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("Days")}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              onChange={(_, value) => field.onChange(value.map((v) => v))}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          //color="primary"
          className="px-4 py-2 text-primary-0 bg-primary-500 hover:bg-primary-600 rounded-md shadow"
          size="large"
          fullWidth
        >
          {t("Save")}
        </Button>
      </form>
    </div>
  );
};

export default CreateSchedule;

// "use client";

// import React, { useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Typography from "@mui/material/Typography";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import {
//   useCreateScheduleMutation,
//   useUpdateScheduleMutation,
//   SchedulePayload,
//   Schedule,
// } from "@/lib/admin/store/services/schedule.service";
// import { useTranslations } from "next-intl";

// // Define the schedule types and days of the week
// const scheduleTypeList = ["MEETING", "APPOINTMENT", "PERSONAL"];
// const daysList = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// // Schema for form validation
// const schema = z.object({
//   name: z.string().nonempty("Schedule Name is required."),
//   startDate: z.date(),
//   endDate: z.date(),
//   scheduleType: z.string().nonempty("Schedule Type is required."),
//   days: z.array(z.string()).optional(),
// });

// const CreateSchedule: React.FC<{ item?: Schedule }> = ({ item }) => {
//   const t = useTranslations("CreateSchedule");

//   // Initialize defaultValues with item data if it exists
//   const defaultValues = {
//     name: item?.name || "",
//     startDate: item?.startDate ? new Date(item.startDate) : new Date(),
//     endDate: item?.endDate ? new Date(item.endDate) : new Date(),
//     scheduleType: item?.scheduleType || "",
//     days: item?.days || [],
//   };

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues,
//     mode: "all",
//     resolver: zodResolver(schema),
//   });

//   const [createSchedule] = useCreateScheduleMutation();
//   const [updateSchedule] = useUpdateScheduleMutation();

//   // Reset the form when the item changes
//   useEffect(() => {
//     reset(defaultValues);
//   }, [item, reset]);

//   // Handle form submission
//   const handleFormSubmit = async (data: Record<string, any>) => {
//     try {
//       if (item) {
//         await updateSchedule({ id: item.id, ...data });
//       } else {
//         await createSchedule(data as any);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   // Get translated days of the week
//   const translatedDays = daysList.map((day) => ({
//     value: day,
//     label: t(`daysOfWeek.${day}`),
//   }));

//   // Get translated schedule types
//   const translatedScheduleTypes = scheduleTypeList.map((type) => ({
//     value: type,
//     label: t(`scheduleType.${type}`),
//   }));

//   return (
//     <div>
//       <form
//         className="w-full text-primary space-y-10 p-5 m-5"
//         onSubmit={handleSubmit(handleFormSubmit)}
//       >
//         {/* Name Field */}
//         <Controller
//           name="name"
//           control={control}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label={t("Name")}
//               variant="outlined"
//               error={!!errors.name}
//               helperText={errors?.name?.message}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//           )}
//         />

//         {/* Start Date Field */}
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Controller
//             name="startDate"
//             control={control}
//             render={({ field }) => (
//               <DateTimePicker
//                 {...field}
//                 label={t("StartDate")}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     variant="outlined"
//                     sx={{ mb: 2 }}
//                     error={!!errors.startDate}
//                     helperText={errors?.startDate?.message}
//                   />
//                 )}
//               />
//             )}
//           />
//         </LocalizationProvider>

//         {/* End Date Field */}
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Controller
//             name="endDate"
//             control={control}
//             render={({ field }) => (
//               <DateTimePicker
//                 {...field}
//                 label={t("EndDate")}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     variant="outlined"
//                     sx={{ mb: 2 }}
//                     error={!!errors.endDate}
//                     helperText={errors?.endDate?.message}
//                   />
//                 )}
//               />
//             )}
//           />
//         </LocalizationProvider>

//         {/* Schedule Type Field */}
//         <Controller
//           name="scheduleType"
//           control={control}
//           render={({ field }) => (
//             <Autocomplete
//               options={scheduleTypeList}
//               getOptionLabel={(option) => option}
//               value={field.value || ""}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label={t("Type")}
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mb: 2 }}
//                   error={!!errors.scheduleType}
//                   helperText={errors?.scheduleType?.message}
//                 />
//               )}
//               onChange={(_, value) => field.onChange(value || "")}
//             />
//           )}
//         />

//         {/* Days Field */}
//         <Controller
//           name="days"
//           control={control}
//           render={({ field }) => (
//             <Autocomplete
//               multiple
//               options={daysList}
//               getOptionLabel={(option) => option}
//               value={field.value || []}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label={t("Days")}
//                   variant="outlined"
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//               )}
//               onChange={(_, value) => field.onChange(value)}
//             />
//           )}
//         />

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           variant="contained"
//           className="px-4 py-2 text-primary-0 bg-primary-500 hover:bg-primary-600 rounded-md shadow"
//           size="large"
//           fullWidth
//         >
//           {t("Save")}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CreateSchedule;

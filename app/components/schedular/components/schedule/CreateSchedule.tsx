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
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
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
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          backgroundColor: "var(--primary-50)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "var(--primary-900)" }}
        >
          {item ? t("UpdateSchedule") : t("CreateSchedule")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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
                  label={t("Start Date")}
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
                  label={t("End Date")}
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
              const selectedOption = translatedScheduleTypes.find(
                (option) => option.value === field.value
              );

              return (
                <Autocomplete
                  {...field}
                  options={translatedScheduleTypes}
                  getOptionLabel={(option) => option.label}
                  value={selectedOption || null} // Ensure the value is an object or null
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
                    field.onChange(value ? value.value : "");
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
                options={translatedDays}
                getOptionLabel={(option) => option.label}
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
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateSchedule;

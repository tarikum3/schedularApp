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

const schema = z.object({
  name: z.string().nonempty("Schedule Name is required."),
  startDate: z.date(),
  endDate: z.date(),
  scheduleType: z.string().nonempty("Schedule Type is required."),
  days: z.array(z.string()).optional(),
});

const defaultValues = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  scheduleType: "",
  days: [],
};

const CreateSchedule: React.FC<{ item?: Schedule }> = ({ item }) => {
  const { handleSubmit, control, formState } = useForm({
    defaultValues:
      // item ? { ...item, startDate: new Date(item.startDate), endDate: new Date(item.endDate) }:
      defaultValues,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      console.log("Submitting data...", data);
      if (item) {
        // Update existing schedule
        const response = await updateSchedule({
          id: item.id,
          ...data,
        });
        console.log("Schedule updated successfully:", response);
      } else {
        // Create new schedule
        const response = await createSchedule(data as any);
        console.log("Schedule created successfully:", response);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {item ? "Update Schedule" : "Create Schedule"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Schedule Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors?.name?.message}
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="Start Date"
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="End Date"
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

          <Controller
            name="scheduleType"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={scheduleTypeList}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Schedule Type"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />

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
                    label="Days"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            {item ? "Update Schedule" : "Create Schedule"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateSchedule;

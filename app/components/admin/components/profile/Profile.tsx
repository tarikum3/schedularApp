"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@mui/material/Icon";
import { useUpdateProfileMutation } from "@lib/admin/store/services/profile.service";

const schema = z.object({
  name: z.string().nonempty(" Name is required."),
});

const defaultValues = {
  name: "",
};

export default function ProfileComponent() {
  const { handleSubmit, register, control, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [updateProfile] = useUpdateProfileMutation();

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      console.log("Submitting data...", data);
      const response = await createProduct(data);
      console.log("Data submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-6 w-full pt-8">
      <h1 className="pb-6 text-3xl font-bold tracking-tight text-primary-900">
        My Profile
      </h1>
      <form
        className="w-full text-primary space-y-10 p-5 m-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label="Name"
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </form>
    </div>
  );
}

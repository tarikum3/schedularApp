"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "@lib/admin/store/services/profile.service";

// Define the schema based on the Customer model
const schema = z
  .object({
    firstName: z.string().nonempty("First name is required."),
    lastName: z.string().nonempty("Last name is required."),
    email: z.string().email("Invalid email address.").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfileComponent() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetProfileQuery();

  // Populate form fields with profile data
  useEffect(() => {
    if (profileData) {
      reset({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        country: profileData.country,
        postalCode: profileData.postalCode,
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [profileData, reset]);

  const handleFormSubmit = async (data: any) => {
    try {
      // Only include password fields if they are being updated
      const payload = showPasswordFields
        ? data
        : { ...data, newPassword: undefined, confirmPassword: undefined };
      await updateProfile(payload).unwrap();
      console.log("Profile updated successfully!");
      reset(data); // Reset the form to the new values
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    reset(); // Reset the form to its original state
    setShowPasswordFields(false); // Hide password fields
  };

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (isProfileError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error loading profile:{" "}
        {(profileError as any)?.data?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 w-full pt-8">
      <Typography
        variant="h3"
        className="pb-6 font-bold tracking-tight text-primary-900"
      >
        My Profile
      </Typography>
      <form
        className="w-full space-y-6 p-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <Typography variant="h5" className="text-primary-700 font-semibold">
            Personal Information
          </Typography>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                label="First Name"
                required
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Last Name"
                required
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
                disabled // Disable email field
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                label="Phone"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <Typography variant="h5" className="text-primary-700 font-semibold">
            Address
          </Typography>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
                label="Address"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.city}
                helperText={errors.city?.message}
                label="City"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.state}
                helperText={errors.state?.message}
                label="State"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.country}
                helperText={errors.country?.message}
                label="Country"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                label="Postal Code"
                fullWidth
                variant="outlined"
                className="mb-4"
                InputLabelProps={{ className: "text-primary-700" }}
                InputProps={{ className: "text-primary-900" }}
              />
            )}
          />
        </div>

        {/* Password Section */}
        {showPasswordFields && (
          <div className="space-y-4">
            <Typography variant="h5" className="text-primary-700 font-semibold">
              Change Password
            </Typography>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  label="New Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  className="mb-4"
                  InputLabelProps={{ className: "text-primary-700" }}
                  InputProps={{ className: "text-primary-900" }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  className="mb-4"
                  InputLabelProps={{ className: "text-primary-700" }}
                  InputProps={{ className: "text-primary-900" }}
                />
              )}
            />
          </div>
        )}

        {/* Change Password Toggle */}
        <Button
          type="button"
          variant="outlined"
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className="text-primary-500 border-primary-500 hover:bg-primary-50"
        >
          {showPasswordFields ? "Cancel Password Change" : "Change Password"}
        </Button>

        {/* Save and Cancel Buttons */}
        {isDirty && (
          <div className="flex space-x-4">
            <Button
              type="submit"
              variant="contained"
              disabled={isUpdating}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              className="text-primary-500 border-primary-500 hover:bg-primary-50"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

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
      const payload = showPasswordFields
        ? data
        : { ...data, newPassword: undefined, confirmPassword: undefined };
      await updateProfile(payload).unwrap();
      console.log("Profile updated successfully!");
      reset(data);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    reset();
    setShowPasswordFields(false);
  };

  // if (isProfileLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  // if (isProfileError) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-red-600">
  //       Error loading profile:{" "}
  //       {(profileError as any)?.data?.message || "Unknown error"}
  //     </div>
  //   );
  // }

  return (
    <div
      className="min-h-screen p-8 "
      style={{
        fontFamily: "'Inter', sans-serif", // Modern sans-serif font
      }}
    >
      <div
        className="max-w-7xl mx-auto p-8 bg-primary-0 rounded-xl shadow-2xl"
        style={{
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="h3"
          className="text-4xl font-bold text-primary-900 mb-8"
          style={{
            fontFamily: "'Poppins', sans-serif", // Bold and modern font for headings
          }}
        >
          My Profile
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <Typography
              variant="h5"
              className="text-2xl font-semibold text-primary-800"
              style={{
                fontFamily: "'Poppins', sans-serif", // Semi-bold for section headings
              }}
            >
              Personal Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
                    disabled
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
                  />
                )}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-6">
            <Typography
              variant="h5"
              className="text-2xl font-semibold text-primary-800"
              style={{
                fontFamily: "'Poppins', sans-serif", // Semi-bold for section headings
              }}
            >
              Address
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
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
                    size="small"
                    className="bg-primary-50 rounded-lg"
                    InputProps={{
                      className: "text-primary-900",
                      style: { borderRadius: "12px" },
                    }}
                    InputLabelProps={{
                      className: "text-primary-700 font-medium", // Medium font for labels
                    }}
                  />
                )}
              />
            </div>
          </div>

          {/* Password Section */}
          {showPasswordFields && (
            <div className="space-y-6">
              <Typography
                variant="h5"
                className="text-2xl font-semibold text-primary-800"
                style={{
                  fontFamily: "'Poppins', sans-serif", // Semi-bold for section headings
                }}
              >
                Change Password
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      size="small"
                      className="bg-primary-50 rounded-lg"
                      InputProps={{
                        className: "text-primary-900",
                        style: { borderRadius: "12px" },
                      }}
                      InputLabelProps={{
                        className: "text-primary-700 font-medium", // Medium font for labels
                      }}
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
                      size="small"
                      className="bg-primary-50 rounded-lg"
                      InputProps={{
                        className: "text-primary-900",
                        style: { borderRadius: "12px" },
                      }}
                      InputLabelProps={{
                        className: "text-primary-700 font-medium", // Medium font for labels
                      }}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* Change Password Toggle */}
          <Button
            type="button"
            variant="outlined"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="w-full md:w-auto text-primary-700 border-primary-300 hover:bg-primary-50 font-medium"
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                className="text-primary-700 border-primary-300 hover:bg-primary-50 font-semibold py-2 px-6 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

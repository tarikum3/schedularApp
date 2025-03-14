"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "@mui/material/Icon";

interface FieldConfig {
  name: string;
  label: string;
  required: boolean;
  default: any;
  fieldType: "TextField" | "Checkbox" | "Autocomplete" | "File";
  props?: Record<string, any>;
}

interface DynamicFormProps {
  formTitle: string;
  fields: FieldConfig[];
  zodSchema: ZodSchema;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formTitle,
  fields,
  zodSchema,
  onSubmit,
}) => {
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.default;
    return acc;
  }, {} as Record<string, any>);

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues,
    resolver: zodResolver(zodSchema),
    mode: "all",
  });

  const { isSubmitting, isValid, dirtyFields } = formState;

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      await onSubmit(data);
      reset(defaultValues);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="flex w-full max-w-screen-md justify-start items-start">
      <form className="w-1/2" onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h5" className="mb-16">
          {formTitle}
        </Typography>

        {fields.map((field) => (
          <div className="mt-16" key={field.name}>
            {field.fieldType === "TextField" && (
              <Controller
                name={field.name}
                control={control}
                render={({
                  field: { onChange, value, ...restField },
                  fieldState,
                }) => (
                  <TextField
                    label={field.label}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={value}
                    onChange={onChange}
                    required={field.required}
                    fullWidth
                    {...field.props}
                    {...restField}
                  />
                )}
              />
            )}

            {field.fieldType === "Checkbox" && (
              <Controller
                name={field.name}
                control={control}
                render={({
                  field: { onChange, value, ...restField },
                  fieldState,
                }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        {...field.props}
                        {...restField}
                      />
                    }
                    label={field.label}
                  />
                )}
              />
            )}

            {field.fieldType === "Autocomplete" && (
              <Controller
                name={field.name}
                control={control}
                render={({
                  field: { onChange, value, ...restField },
                  fieldState,
                }) => (
                  <Autocomplete
                    multiple
                    options={field.props?.options || []}
                    value={value || []}
                    onChange={(_event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={field.label}
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field.props}
                      />
                    )}
                    {...field.props}
                    {...restField}
                  />
                )}
              />
            )}

            {field.fieldType === "File" && (
              <Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-wrap gap-4">
                    <label
                      htmlFor={`${field.name}-file`}
                      className="flex items-center justify-center relative w-32 h-32 border rounded-lg cursor-pointer overflow-hidden shadow hover:shadow-lg"
                    >
                      <input
                        accept={field.props?.accept || ""}
                        id={`${field.name}-file`}
                        type="file"
                        className="hidden"
                        multiple={field.props?.multiple}
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          onChange([...value, ...files]);
                        }}
                      />
                      <Icon fontSize="large" color="action">
                        cloud_upload
                      </Icon>
                    </label>

                    {value.map((file: File, index: number) => (
                      <div
                        key={index}
                        className="relative w-32 h-32 border rounded-lg overflow-hidden shadow"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = value.filter(
                              (_: any, i: any) => i !== index
                            );
                            onChange(newValue);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-primary-0 rounded-full p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            )}
          </div>
        ))}

        <div className="flex my-16 items-center">
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={
              isSubmitting || Object.keys(dirtyFields).length === 0 || !isValid
            }
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          <Button
            className="mx-8"
            type="button"
            onClick={() => reset(defaultValues)}
            disabled={isSubmitting}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;

export const ProductCreationForm: React.FC = () => {
  // Updated schema to include image validation
  const schema = z.object({
    productName: z.string().nonempty("Product Name is required."),
    productCategory: z
      .array(z.string())
      .min(1, "At least one category is required."),
    agreeTerms: z.boolean().refine((val) => val, "You must accept the terms."),
    productImages: z
      .array(z.any()) // Can use `z.instanceof(File)` if you want to ensure it's a File object
      .min(1, "At least one image is required.")
      .refine(
        (files) => files.every((file: File) => file.type.startsWith("image/")),
        {
          message: "All uploaded files must be images.",
        }
      ),
  });

  const fields: FieldConfig[] = [
    {
      name: "productName",
      label: "Product Name",
      required: true,
      default: "",
      fieldType: "TextField",
      props: { placeholder: "Enter the product name" },
    },
    {
      name: "productCategory",
      label: "Product Category",
      required: true,
      default: [],
      fieldType: "Autocomplete",
      props: {
        options: ["Clothing", "Accessories", "Electronics", "Home"],
        placeholder: "Select categories",
      },
    },
    {
      name: "agreeTerms",
      label: "I agree to the terms and conditions",
      required: true,
      default: false,
      fieldType: "Checkbox",
    },
    {
      name: "productImages",
      label: "Upload Product Images",
      required: true,
      default: [],
      fieldType: "File",
      props: { accept: "image/*", multiple: true },
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      console.log("Submitting data...", data);

      // If you need to upload images to an API
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productCategory", JSON.stringify(data.productCategory));
      formData.append("agreeTerms", String(data.agreeTerms));
      data.productImages.forEach((file: File) => {
        formData.append("productImages", file);
      });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Data submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <DynamicForm
        formTitle="Create New Product"
        fields={fields}
        zodSchema={schema}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

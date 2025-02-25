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
import { useCreateProductMutation } from "@lib/admin/store/services/product.service";

const categoryList = [
  "Electronics",
  "Apparel",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
];

const schema = z.object({
  name: z.string().nonempty("Product Name is required."),
  description: z.string().optional(),
  slug: z.string().nonempty("Slug is required."),
  sku: z.string().optional(),
  category: z.string().optional(),
  vendor: z.string().optional(),
  tags: z.array(z.string()).optional(),
  availableForSale: z.boolean(),
});

const defaultValues = {
  name: "",
  description: "",
  slug: "",
  sku: "",
  category: "",
  vendor: "",
  tags: [],
  availableForSale: true,
};

const CreateProduct: React.FC = () => {
  const { handleSubmit, register, control, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const [createProduct] = useCreateProductMutation();

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
    <div className="flex w-full max-w-screen-md justify-start items-start ">
      <form
        className="w-full text-primary space-y-10 p-5 m-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors?.name?.message}
                required
                fullWidth
              />
            )}
            name="name"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
              />
            )}
            name="description"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Slug"
                variant="outlined"
                error={!!errors.slug}
                helperText={errors?.slug?.message}
                required
                fullWidth
              />
            )}
            name="slug"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField {...field} label="SKU" variant="outlined" fullWidth />
            )}
            name="sku"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={categoryList}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
            name="category"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Vendor"
                variant="outlined"
                fullWidth
              />
            )}
            name="vendor"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={[]}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    variant="outlined"
                    fullWidth
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
            name="tags"
            control={control}
          />
        </div>

        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Available For Sale"
              />
            )}
            name="availableForSale"
            control={control}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;

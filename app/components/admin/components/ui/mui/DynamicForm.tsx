'use client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//import { DevTool } from '@hookform/devtools';

interface FieldConfig {
  name: string;
  label: string;
  required: boolean;
  default: any;
  fieldType: 'TextField' | 'Checkbox' | 'Autocomplete';
  props?: Record<string, any>;
}

interface DynamicFormProps {
  formTitle: string;
  fields: FieldConfig[];
  zodSchema: ZodSchema;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formTitle, fields, zodSchema, onSubmit }) => {
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.default;
    return acc;
  }, {} as Record<string, any>);

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues,
    resolver: zodResolver(zodSchema),
    mode: 'all',
  });

  const { isSubmitting, isValid, dirtyFields, errors } = formState;

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      await onSubmit(data);
      reset(defaultValues);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="flex w-full max-w-screen-md justify-start items-start">
      <form
        className="w-1/2"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Typography variant="h5" className="mb-16">
          {formTitle}
        </Typography>

        {fields.map((field) => (
          <div className="mt-16" key={field.name}>
            {field.fieldType === 'TextField' && (
              <Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value, ...restField }, fieldState }) => (
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

            {field.fieldType === 'Checkbox' && (
              <Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value, ...restField }, fieldState }) => (
                  <FormControl error={!!fieldState.error} required={field.required}>
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
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            )}

            {field.fieldType === 'Autocomplete' && (
              <Controller
                name={field.name}
                control={control}
                render={({ field: { onChange, value, ...restField }, fieldState }) => (
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
          </div>
        ))}

        <div className="flex my-16 items-center">
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting || Object.keys(dirtyFields).length === 0 || !isValid}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
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

      <div className="w-1/2 my-16 p-24">
        <Typography variant="body1">Form State:</Typography>
        <pre className="p-16 bg-gray-100 rounded-lg">
          {JSON.stringify(formState, null, 2)}
        </pre>
      </div>

      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default DynamicForm;




export const ProductCreationForm: React.FC = () => {
  const schema = z.object({
    productName: z.string().nonempty('Product Name is required.'),
    productCategory: z
      .array(z.string())
      .min(1, 'At least one category is required.'),
    agreeTerms: z.boolean().refine((val) => val, 'You must accept the terms.'),
  });

  const fields : FieldConfig[] = [
    {
      name: 'productName',
      label: 'Product Name',
      required: true,
      default: '',
      fieldType: 'TextField',
      props: { placeholder: 'Enter the product name' },
    },
    {
      name: 'productCategory',
      label: 'Product Category',
      required: true,
      default: [],
      fieldType: 'Autocomplete',
      props: {
        options: ['Clothing', 'Accessories', 'Electronics', 'Home'],
        placeholder: 'Select categories',
      },
    },
    {
      name: 'agreeTerms',
      label: 'I agree to the terms and conditions',
      required: true,
      default: false,
      fieldType: 'Checkbox',
    },
  ];


  const handleSubmit = async (data: Record<string, any>) => {
    try {
      console.log('Submitting data...', data);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Data submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting data:', error);
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



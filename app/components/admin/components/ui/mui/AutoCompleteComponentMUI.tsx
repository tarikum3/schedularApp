'use client';
//@ts-nocheck
import React, { useEffect } from 'react';
 //import { MuiAutocompleteProps } from './types';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Autocomplete, CircularProgress, Grid, TextField } from '@mui/material';

interface Props {
  hookForm: UseFormReturn<any>;
  config:  any;
}

export const AutoCompleteComponentMUI: React.FC<Props> = ({
  hookForm,
  config,
}) => {
  const [open, setOpen] = React.useState(false);

  const { errors } = hookForm.formState;

 

  return (
    <Grid item xs={12} {...config?.grid}>
      <Controller
        {...config}
        render={(props) => (
          <Autocomplete
            {...config}
            {...props}
            {...props.field}
            id={'autocomplete'}
            onChange={(event: any, item: any) => {
              props.field.onChange(item);
            }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={config.options}
            getOptionSelected={(option: any, value: any) =>
              option[config.optionLabel] === value[config.optionValue]
            }
            style={{ width: config.width ? config.width : '100%' }}
            getOptionLabel={(option: any) => option[config.optionLabel]}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  {...config}
                  helperText={
                    errors[`${config.name}`]
                      ? errors[`${config?.name}`]?.message
                      : null
                  }
                  error={errors[`${config.name}`]}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {config.loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    ...config.renderInputProps,
                  }}
                />
              );
            }}
            {...config.renderOption}
          />
        )}
        rules={config.rules}
        control={hookForm.control}
      />
    </Grid>
  );
};

const RenderAutoCompleteComponentMUI = (props: Props) => {
  return <AutoCompleteComponentMUI {...props} />;
};

export default RenderAutoCompleteComponentMUI;

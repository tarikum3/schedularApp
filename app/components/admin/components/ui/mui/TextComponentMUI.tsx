'use client';
//@ts-nocheck
import React from 'react';
import { MuiTextFieldTypeProps } from './types';
import { Box, Grid, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

interface Props {
  hookForm: UseFormReturn<any>;
  config: MuiTextFieldTypeProps;
}

export const TextComponentMUI: React.FC<Props> = ({ hookForm, config }) => {
  const { formState } = hookForm;

  return (
    <Grid item xs={12} {...config?.grid}>
      <Box>
        <Controller
          name={config.name}
          control={hookForm.control}
          rules={config.rules}
          render={({ field }) => (
            <TextField
              {...field}
              // value={config.value}
              fullWidth
              {...config}
              multiline={config.multiline}
              rows={config.rows}
              helperText={
                formState.errors[`${config.name}`]
                  ? formState.errors[`${config.name}`]?.message
                  : config.hintText
              }
              error={Boolean(formState.errors[`${config.name}`])}
              // onChange={(e) => {
              //   field.onChange(e);
              //   if (config.onChange) {
              //     config.onChange(e);
              //   }
              // }}
              // onClick={(e) => {
              //   if (config.onClick) {
              //     config.onClick(e);
              //   }
              // }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                },
              }}
            />
          )}
        />
      </Box>
    </Grid>
  );
};

const RenderTextComponentMUI = (props: Props) => {
  return <TextComponentMUI {...props} />;
};

export default RenderTextComponentMUI;

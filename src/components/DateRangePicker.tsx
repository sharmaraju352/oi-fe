import React from 'react';
import { Grid, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateRangePickerProps {
  isCustomDate: boolean;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  minDate: Date;
  maxDate: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  isCustomDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  minDate,
  maxDate
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Grid item>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(date: Date | null) => {
          if (date) setStartDate(date);
        }}
        minDate={minDate}
        maxDate={endDate || maxDate}
        disabled={!isCustomDate}
        format="dd/MM/yyyy"
        slots={{
          textField: TextField
        }}
        slotProps={{
          textField: {
            fullWidth: true
          }
        }}
      />
    </Grid>
    <Grid item>
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(date: Date | null) => {
          if (date) setEndDate(date);
        }}
        minDate={startDate || minDate}
        maxDate={maxDate}
        disabled={!isCustomDate}
        format="dd/MM/yyyy"
        slots={{
          textField: TextField
        }}
        slotProps={{
          textField: {
            fullWidth: true
          }
        }}
      />
    </Grid>
  </LocalizationProvider>
);

export default DateRangePicker;

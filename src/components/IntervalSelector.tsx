import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IntervalOption } from './constants';

interface IntervalSelectorProps {
  interval: string;
  intervals: IntervalOption[];
  setInterval: React.Dispatch<React.SetStateAction<string>>;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ interval, intervals, setInterval }) => (
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel id="interval-label">Interval</InputLabel>
    <Select
      labelId="interval-label"
      id="interval-select"
      value={interval}
      onChange={(e) => setInterval(e.target.value as string)}
      label="Interval"
    >
      {intervals.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default IntervalSelector;

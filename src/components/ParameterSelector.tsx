import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import { ParameterOption } from './constants';

interface ParameterSelectorProps {
  parameters: string[];
  parameterOptions: ParameterOption[];
  handleParameterChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ParameterSelector: React.FC<ParameterSelectorProps> = ({
  parameters,
  parameterOptions,
  handleParameterChange,
}) => (
  <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
    <InputLabel id="parameter-label">Parameters</InputLabel>
    <Select
      labelId="parameter-label"
      id="parameter-select"
      multiple
      value={parameters}
      onChange={handleParameterChange}
      input={<OutlinedInput label="Parameters" />}
      renderValue={(selected) => {
        const selectedValues = selected as string[];
        return selectedValues.length > 2
          ? `${selectedValues.length} parameters selected`
          : selectedValues
              .map((value) => parameterOptions.find((option) => option.value === value)?.label)
              .join(', ');
      }}
      MenuProps={{
        PaperProps: { style: { maxHeight: 300, width: 250 } },
      }}
    >
      {parameterOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={parameters.indexOf(option.value) > -1} />
          <ListItemText primary={option.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ParameterSelector;
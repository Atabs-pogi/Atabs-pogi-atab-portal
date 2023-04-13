import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectPeriod(props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Period"
          {...props}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="semi-monthly">Semi-Monthly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

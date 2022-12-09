import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectStrip(props) {
  return (
    <Box sx={{ pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Stripping Cleaning</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ py: 1.5 }}
          {...props}
        >
          <MenuItem value="Excellent">Excellent</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Fur">Fur</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

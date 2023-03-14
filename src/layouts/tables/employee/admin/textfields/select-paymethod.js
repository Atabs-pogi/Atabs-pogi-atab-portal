import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectPayMethod(props) {
  return (
    <Box>
      <FormControl fullWidth sx={{ float: "right", width: "12vw" }}>
        <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Payment Method"
          {...props}
          sx={{ pt: 1, pb: 2 }}
        >
          <MenuItem value="Remitance">Remitance</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Direct Deposi">Direct Deposit</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

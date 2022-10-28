import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectRole(props) {
  return (
    <Box sx={{ pr: 7 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          sx={{ py: 1.5 }}
          {...props}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Cashier">Cashier</MenuItem>
          <MenuItem value="POS">POS</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

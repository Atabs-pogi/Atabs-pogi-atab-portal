import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectRole(props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" size="small" {...props}>
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="cashier">cashier</MenuItem>
          <MenuItem value="pos">pos</MenuItem>
          <MenuItem value="hr">hr</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

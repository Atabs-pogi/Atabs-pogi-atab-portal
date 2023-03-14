import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectReport(props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Report to Generate</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Report to Generate"
          {...props}
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="farmer">Farmer</MenuItem>
          <MenuItem value="fiber">Fiber</MenuItem>
          <MenuItem value="account">Account</MenuItem>
          <MenuItem value="tuxy">Tuxy</MenuItem>
          <MenuItem value="tuxylogs">Price Logs</MenuItem>
          <MenuItem value="costingbill">Costing Bill</MenuItem>
          <MenuItem value="transactions">Transactions</MenuItem>
          <MenuItem value="merchproduct">Merchant Product</MenuItem>
          <MenuItem value="payslip">Payslip</MenuItem>
          <MenuItem value="payslipsummary">Payslip Summary</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

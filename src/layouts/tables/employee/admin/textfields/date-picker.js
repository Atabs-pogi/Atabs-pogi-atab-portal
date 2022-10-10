import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";

export default function TextFieldDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MDBox sx={{ textAlign: "center", display: "Inline-block", mr: 2, mt: 2, width: 185 }}>
        <DatePicker {...props} renderInput={(params) => <TextField {...params} />} />
      </MDBox>
    </LocalizationProvider>
  );
}

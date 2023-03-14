import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectFileType(props) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">File Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="File Type"
          sx={{ py: 1.5 }}
          {...props}
        >
          <MenuItem value="pdf">pdf</MenuItem>
          <MenuItem value="doc">doc</MenuItem>
          <MenuItem value="xlsx">xlsx</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

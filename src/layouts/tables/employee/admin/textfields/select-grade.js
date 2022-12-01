import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectGrade(props) {
  return (
    <Box sx={{ pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Grade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ py: 1.5 }}
          {...props}
        >
          <MenuItem value="s1">S1</MenuItem>
          <MenuItem value="s2">S2</MenuItem>
          <MenuItem value="s3">S3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

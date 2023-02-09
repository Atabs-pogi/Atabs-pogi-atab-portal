import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

export default function EmployeeSelect({ items, ...props }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Employee</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{ width: "37vh", height: "45px" }}
        {...props}
      >
        {items?.map?.((item) => (
          <MenuItem value={item?.id}>
            {item?.firstName} {item?.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

EmployeeSelect.defaultProps = {
  items: [],
  value: null,
  onChange: () => {},
};
// Typechecking props of the MDAlert
EmployeeSelect.propTypes = {
  items: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

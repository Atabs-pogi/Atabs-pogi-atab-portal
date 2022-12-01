import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

export default function SelectFiber({ onChange, ...props }) {
  const fibers = [
    {
      id: 1,
      name: "Abaca",
      prices: [
        { price: 100, grade: "s1" },
        { price: 150, grade: "s2" },
        { price: 200, grade: "s3" },
      ],
    },
    {
      id: 2,
      name: "Tuxy",
      prices: [
        { price: 101, grade: "s1" },
        { price: 151, grade: "s2" },
        { price: 201, grade: "s3" },
      ],
    },
    {
      id: 3,
      name: "Wheat",
      prices: [
        { price: 102, grade: "s1" },
        { price: 152, grade: "s2" },
        { price: 202, grade: "s3" },
      ],
    },
  ];

  const handleChange = (evt) => {
    const match = fibers.find((fiber) => fiber.id === evt?.target?.value);
    onChange?.(match);
  };

  return (
    <Box sx={{ pr: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Fiber</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ py: 1.5 }}
          onChange={handleChange}
          {...props}
        >
          {fibers?.map((fiber) => (
            <MenuItem value={fiber?.id} key={fiber?.id}>
              {fiber?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

SelectFiber.defaultProps = {
  onChange: () => {},
};
// Typechecking props of the MDAlert
SelectFiber.propTypes = {
  onChange: PropTypes.func,
};

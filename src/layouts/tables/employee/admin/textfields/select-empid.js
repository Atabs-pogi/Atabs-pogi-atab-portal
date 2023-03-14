import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import employeeService from "../../../../../services/employee-service";

export default function SelectEmpID(props) {
  const [empID, setEmpID] = React.useState([]);

  const handleEmployee = () => {
    employeeService
      .searchEmployee()
      .then((employees) => {
        const employeeIds = employees.map((employee) => employee.id);
        setEmpID(employeeIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    handleEmployee();
  }, []);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Emp ID</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Emp ID"
          {...props}
          sx={{ pt: 1, pb: 2 }}
        >
          {empID.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

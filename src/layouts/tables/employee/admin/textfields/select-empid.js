import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import employeeService from "../../../../../services/employee-service";

export default function SelectEmpID(props) {
  const [employees, setEmployees] = React.useState([]);

  const handleEmployee = () => {
    employeeService
      .searchEmployee()
      .then((emps) => {
        const empDetails = emps.map((employee) => employee);
        setEmployees(empDetails);
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
        <InputLabel id="demo-simple-select-label">Employee ID</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Employee ID"
          {...props}
          sx={{ pt: 1, pb: 2 }}
        >
          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.id}>
              ({emp.id}) - {emp.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

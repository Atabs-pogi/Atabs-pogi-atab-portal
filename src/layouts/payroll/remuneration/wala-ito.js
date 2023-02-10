import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import React from "react";
import MDButton from "components/MDButton";
import employeeService from "services/employee-service";
import EmployeeSelect from "./select-employee";

function PayrollPeriod({ ...props }) {
  return (
    <MDBox>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment Period</InputLabel>
        <Select sx={{ py: 1.5 }} {...props}>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="semi-monthly">Semi-Monthly</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

export default function Remunuration() {
  const [loading, setLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [employee, setEmployee] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    setLoading(true);
    employeeService
      .searchEmployee(employee)
      .then((b) => setEmployees(b))
      .finally(() => setLoading(false));
  }, []);

  const handleEmployeeChange = (evt) => {
    setEmployee(evt.target.value);
  };

  return (
    <MDBox>
      <MDBox sx={{ display: "flex", flexDirection: "column", height: "75vh", p: 3 }}>
        <MDBox className="header">
          <Typography variant="h3" component="h2" sx={{ fontSize: 18, mb: 3 }}>
            Employee Information
          </Typography>
        </MDBox>
        <MDBox className="content" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EmployeeSelect
                label="Employee"
                items={employees}
                name="firstName"
                value={employee}
                disabled={loading}
                variant="outlined"
                onChange={handleEmployeeChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ py: 0.1, opacity: 10 }} />
              <Typography variant="h3" component="h2" sx={{ fontSize: 18, mb: 1 }}>
                Payroll Period
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <PayrollPeriod
                label="Payment Period"
                name="password"
                variant="outlined"
                fullWidth
                disabled={loading}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Basic Pay"
                name="basic"
                variant="outlined"
                fullWidth
                disabled={loading}
              />
            </Grid>
          </Grid>
          {error}
        </MDBox>
        <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
          <MDButton type="submit" variant="contained" color="info" sx={{ mr: 2, mt: 5, width: 80 }}>
            Compute
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

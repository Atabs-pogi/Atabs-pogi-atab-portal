import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import payrollService from "services/payroll-service";
import employeeService from "services/employee-service";
import MDButton from "components/MDButton";
import Moment from "react-moment";
import BasePay from "./base-pay";

export default function Payroll() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  // const [wala, setWala] = React.useState([]);
  // const [salaryExist, setSalaryExist] = React.useState(true);

  const [start, end] = React.useMemo(() => {
    const st = date.getDate() > 15 ? 16 : 1;
    const ed =
      date.getDate() < 16 ? 15 : new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const st1 = new Date(date);
    st1.setDate(st);
    const ed1 = new Date(date);
    ed1.setDate(ed);
    return [st1, ed1];
  }, [date]);

  const SalaryExists = (params) => {
    setLoading(true);
    employeeService
      .getSalary()
      .then((res) => {
        const ids = res.map((salary) => salary.employee.id);
        const exists = ids.some((id) => id === params.row.id);
        if (exists) {
          setSelected(params.row);
        } else {
          // eslint-disable-next-line no-alert
          alert("No salary configuration for this employee yet.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setLoading(true);
    payrollService
      .getEmployees(date)
      .then((e) => {
        setEmployees(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, [date]);

  // console.log(salaryExist);

  const UpdateHandleClose = () => setSelected(null);

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "middleName", headerName: "Middlename", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    {
      field: "reviewed",
      headerName: "Status",
      width: 200,
      valueGetter: (params) => (params.row.reviewed ? "Reviewed" : ""),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <MDButton variant="contained" color="success" size="small">
              Review
            </MDButton>
          }
          onClick={() => SalaryExists(params)}
          label="Update"
        />,
      ],
    },
  ]);

  const handleSearchChange = (evt) => {
    setSearch(evt.target.value);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  const handleNextPeriod = () => {
    const st = new Date(date);
    if (st.getDate() > 15) {
      st.setMonth(st.getMonth() + 1);
      st.setDate(1);
    } else {
      st.setDate(16);
    }
    setDate(st);
  };

  const handlePrevPeriod = () => {
    const st = new Date(date);
    if (st.getDate() > 15) {
      st.setDate(1);
    } else {
      st.setMonth(st.getMonth() - 1);
      st.setDate(16);
    }
    setDate(st);
  };

  return (
    <MDBox>
      <BasePay
        open={selected?.id}
        period={date}
        onClose={UpdateHandleClose}
        selected={selected}
        onSuccess={() => {
          setSelected(null);
          handleSearch();
        }}
      />
      <Grid container>
        <Grid item xs={6} p={2} pt={1} pb={0}>
          <IconButton sx={{ display: "inline-block" }} onClick={handlePrevPeriod}>
            <ChevronLeftIcon />
          </IconButton>
          <MDTypography sx={{ display: "inline-block" }}>
            <Moment format="MM/DD/YYYY">{start}</Moment>
          </MDTypography>
          -
          <MDTypography sx={{ display: "inline-block" }}>
            <Moment format="MM/DD/YYYY">{end}</Moment>
          </MDTypography>
          <IconButton sx={{ display: "inline-block" }} onClick={handleNextPeriod}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ my: 1, mx: 1 }}
            onChange={handleSearchChange}
            value={search}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          getRowClassName={(params) => (params.row.reviewed ? "reviewed" : "")}
          rows={employees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

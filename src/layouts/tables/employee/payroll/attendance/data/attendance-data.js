import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import MDButton from "components/MDButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import EmployeeModal from "../modal/employee-add-modal";
// import EmployeeUpdateModal from "../modal/employee-update-modal";

const rows = [
  {
    id: 1,
    lastName: "Villanueva",
    firstName: "Christian",
    middleName: "Pogi",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 2,
    lastName: "Lee",
    firstName: "Paul",
    middleName: "Pogi",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 3,
    lastName: "Hernandez",
    firstName: "Ray",
    middleName: "Pogi",
    address: "Bacoor,Cavite",
    position: "Staff",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 4,
    lastName: "Bautista",
    firstName: "Jude",
    middleName: "Pogi",
    address: "Bacoor,Cavite",
    position: "Janitor",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 5,
    lastName: "Ancajas",
    firstName: "JC",
    middleName: "Gwapo",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 6,
    lastName: "Romero",
    firstName: "Matthew",
    middleName: "Pogi",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 7,
    lastName: "James",
    firstName: "Lebron",
    middleName: "Cute",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 8,
    lastName: "Bol",
    firstName: "Bol",
    middleName: "Bol",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 9,
    lastName: "Nash",
    firstName: "Steve",
    middleName: "Smith",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
  {
    id: 10,
    lastName: "Pierce",
    firstName: "Paul",
    middleName: "Curtis",
    address: "Bacoor,Cavite",
    position: "IT",
    workfrom: "10/1/2022",
    workto: "10/30/2022",
    totalDays: 24,
    perDaySalary: 537,
    taxes: 456,
    sss: 400,
    pagibig: 1000,
    totaldeduction: " ",
    grossincome: " ",
    netincome: " ",
  },
];

export default function AttendanceData() {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  //   const [selected, setSelected] = React.useState(null);
  //   const UpdateHandleClose = () => setSelected(null);
  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    {
      field: "fullname",
      headerName: "Fullname",
      width: 200,
      headerAlign: "center",
      sortable: false,
      valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "position", headerName: "Position", width: 130 },
    { field: "date-today", headerName: "Date", width: 130 },
    { field: "time-in", headerName: "Time in", width: 130 },
    { field: "time-out", headerName: "Time out", width: 130 },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 130,
    //   // eslint-disable-next-line react/no-unstable-nested-components
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<VisibilityOffIcon />}
    //       onClick={() => setSelected(params)}
    //       label="Calculate"
    //     />,
    //     <CalculationPayrollModal
    //       open={params.id === selected?.id}
    //       onClose={UpdateHandleClose}
    //       selected={params}
    //     />,
    //   ],
    // },
  ]);
  return (
    <MDBox>
      <Grid container>
        {/* <Grid>

        </Grid> */}
        <Grid item xs={6} sx={{ textAlign: "left" }}>
          <TextField
            label="Search ID"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ my: 1, mx: 1 }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[1]} />
      </div>
    </MDBox>
  );
}

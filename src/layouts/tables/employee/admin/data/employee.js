import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import EmployeeModal from "../modal/employee-add-modal";
import EmployeeUpdateModal from "../modal/employee-update-modal";

const rows = [
  {
    id: 1,
    lastName: "Kalbo",
    firstName: "Jude",
    middleName: "Panot",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "Judekalbo123@gmail.com",
    sex: "Male",
  },
  {
    id: 2,
    lastName: "Hernandez",
    firstName: "Ray",
    middleName: "Wang od",
    birthday: "10/20/1901",
    mobileNumber: "9425643543",
    email: "Raymapagmahal27@gmail.com",
    sex: "Male",
  },
  {
    id: 3,
    lastName: "Villanueva",
    firstName: "Christian",
    middleName: "Reid",
    birthday: "10/20/2000",
    mobileNumber: "9545232123",
    email: "Christian123@gmail.com",
    sex: "Male",
  },
  {
    id: 4,
    lastName: "Romera",
    firstName: "Mattcha",
    middleName: "Pokwan",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "BaklaAko69@gmail.com",
    sex: "Female",
  },
  {
    id: 5,
    lastName: "Ancajas",
    firstName: "Jc",
    middleName: "Padilla",
    birthday: "10/20/2000",
    mobileNumber: "9523852567",
    email: "JcPogi07@gmail.com",
    sex: "Male",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Edith",
    middleName: "Smith",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "JcPogi07@gmail.com",
    sex: "Female",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    middleName: "Karding",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "JcPogi07@gmail.com",
    sex: "Male",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    middleName: "Panot",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "JcPogi07@gmail.com",
    sex: "Male",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    middleName: "Curtis",
    birthday: "10/20/1990",
    mobileNumber: "9523852567",
    email: "JcPogi07@gmail.com",
    sex: "Male",
  },
];

export default function EmployeeData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);
  const UpdateHandleClose = () => setSelected(null);
  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "Firstname", width: 130 },
    { field: "middleName", headerName: "Middlename", width: 130 },
    { field: "lastName", headerName: "Lastname", width: 130 },
    { field: "mobileNumber", headerName: "Mobile Number", type: "number", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setSelected(params)}
          label="Update"
        />,
        <EmployeeUpdateModal
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params}
        />,
      ],
    },
  ]);
  return (
    <MDBox>
      <EmployeeModal open={open} onClose={handleClose} />
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }}>
          <MDButton variant="contained" onClick={handleOpen} color="success" sx={{ ml: 2 }}>
            <AddIcon sx={{ mr: 1 }} />
            Add Employee
          </MDButton>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <TextField
            label="Search"
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

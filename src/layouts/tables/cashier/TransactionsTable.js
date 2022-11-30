import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import PayrollModal from "../modal/payrollModal";
import TransactionsModal from "./modal/TransactionsModal";
// import EmployeeModal from "../modal/employee-add-modal";
// import EmployeeUpdateModal from "../modal/employee-update-modal";

const rows = [
  {
    farmer_id: 2019101,
    id: 1,
    datetime: "2022/11/26 11:30am",
    total: 100.99,
    status: "Released",
  },
  {
    farmer_id: 2019102,
    id: 2,
    datetime: "2022/11/26 11:30am",
    total: 50.8,
    status: "Released",
  },
  {
    farmer_id: 2019103,
    id: 3,
    datetime: "2022/11/26 11:30am",
    total: 36.55,
    status: "Released",
  },
  {
    farmer_id: 2019104,
    id: 4,
    datetime: "2022/11/26 11:30am",
    total: 55.99,
    status: "Released",
  },
  {
    farmer_id: 2019105,
    id: 5,
    datetime: "2022/11/26 11:30am",
    total: 99.1,
    status: "Released",
  },
  {
    farmer_id: 2019106,
    id: 6,
    datetime: "2022/11/26 11:30am",
    total: 16.99,
    status: "Released",
  },
];

export default function PayrollData() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);
  const UpdateHandleClose = () => setSelected(null);
  const columns = React.useMemo(() => [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => setSelected(params)}
          label="View"
        />,
        <TransactionsModal
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params}
        />,
      ],
    },
    { field: "farmer_id", headerName: "Farmer ID", width: 200 },
    { field: "id", headerName: "Transaction Number", width: 300 },
    { field: "datetime", headerName: "Date&Time", width: 300 },
    { field: "total", headerName: "Total", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
  ]);
  return (
    <MDBox>
      <TransactionsModal open={open} onClose={handleClose} />
      <Grid container>
        <Grid
          item
          sx={{
            width: "100%",
            textAlign: "right",
          }}
        >
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
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[1]} />
      </div>
    </MDBox>
  );
}

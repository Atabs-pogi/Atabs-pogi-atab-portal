import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import PayrollModal from "../modal/payrollModal";
import CalculationPayrollModal from "./modal/TransactionsModal";
// import EmployeeModal from "../modal/employee-add-modal";
// import EmployeeUpdateModal from "../modal/employee-update-modal";

const rows = [
  {
    id: 1,
    total: 100.99,
  },
  {
    id: 2,
    total: 50.8,
  },
  {
    id: 3,
    total: 36.55,
  },
  {
    id: 4,
    total: 55.99,
  },
  {
    id: 5,
    total: 99.1,
  },
  {
    id: 6,
    total: 16.99,
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
        <CalculationPayrollModal
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params}
        />,
      ],
    },
    { field: "id", headerName: "Transaction Number", width: 400 },
    { field: "total", headerName: "Total", width: 400 },
  ]);
  return (
    <MDBox>
      <CalculationPayrollModal open={open} onClose={handleClose} />
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
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[1]} />
      </div>
    </MDBox>
  );
}

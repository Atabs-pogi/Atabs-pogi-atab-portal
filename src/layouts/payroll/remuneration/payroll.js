import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import employeeService from "services/employee-service";
import PaidIcon from "@mui/icons-material/Paid";
import MDTypography from "components/MDTypography";
import BasePay from "./base-pay";

export default function Payroll() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const handleSearch = () => {
    setLoading(true);
    employeeService
      .searchEmployee(search)
      .then((e) => {
        setEmployees(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const UpdateHandleClose = () => setSelected(null);
  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PaidIcon />}
          onClick={() => setSelected(params.row)}
          label="Update"
        />,
        <BasePay
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSearch();
          }}
        />,
      ],
    },
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "middleName", headerName: "Middlename", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    { field: "mobileNumber", headerName: "Mobile Number", type: "string", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      valueGetter: (params) => ["Inactive", "Active"][params?.row?.status] || "Unknown",
    },
  ]);

  const handleSearchChange = (evt) => {
    setSearch(evt.target.value);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MDBox>
      <Grid container>
        <Grid item xs={6} p={2}>
          <MDTypography>Date Here: </MDTypography>
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

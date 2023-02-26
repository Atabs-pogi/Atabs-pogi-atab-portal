import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import payrollService from "services/payroll-service";
import MDButton from "components/MDButton";
import BasePay from "./base-pay";

export default function Payroll() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  const handleSearch = () => {
    setLoading(true);
    payrollService
      .getEmployees()
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
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "middleName", headerName: "Middlename", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
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
          onClick={() => setSelected(params.row)}
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

  return (
    <MDBox>
      <BasePay
        open={selected?.id}
        onClose={UpdateHandleClose}
        selected={selected}
        onSuccess={() => {
          setSelected(null);
          handleSearch();
        }}
      />
      <Grid container>
        <Grid item xs={6} p={2}>
          <MDTypography>Date: {date} </MDTypography>
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
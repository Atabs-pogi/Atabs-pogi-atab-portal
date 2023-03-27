import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import empsalaryService from "services/empsalary-service";
import EmployeeModal from "../modal/employee/employee-add-modal";
import SalaryUpdateModal from "../modal/employee-salary/empsalary-update-modal";

export default function EmployeeSalary() {
  const [empSalary, setSalary] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);
  const [SalaryUpdateOpen, setSalaryUpdateOpen] = React.useState(false);

  const handleSalary = () => {
    setLoading(true);
    empsalaryService
      .getSalary()
      .then((res) => {
        setSalary(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSalaryUpdateClick = (params) => {
    setSalaryUpdateOpen(true);
    setSelected(params.row);
  };

  const handleSalaryUpdateClose = () => {
    setSalaryUpdateOpen(false);
    setSelected(null);
  };

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "employeeId",
      headerName: "Employee ID",
      type: "string",
      width: 150,
      valueGetter: (params) => params.row.employee?.id || "N/A",
    },
    { field: "effDate", headerName: "Effective Date", width: 150 },
    { field: "expDate", headerName: "Expiry Date", width: 150 },
    { field: "dailyBasic", headerName: "Daily Basic", width: 150 },
    { field: "position", headerName: "Position", type: "string", width: 150 },
    { field: "bankAccountInfo", headerName: "Bank Account Info", type: "string", width: 150 },
    { field: "taxInfo", headerName: "Tax Info", type: "string", width: 150 },

    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   valueGetter: (params) => ["Inactive", "Active"][params?.row?.status] || "Unknown",
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => handleSalaryUpdateClick(params)}
          label="Update Salary"
        />,
        <SalaryUpdateModal
          open={params.id === selected?.id && SalaryUpdateOpen}
          onClose={handleSalaryUpdateClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSalary();
          }}
        />,
      ],
    },
  ]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSalary();
    }
  };

  React.useEffect(() => {
    handleSalary();
  }, []);

  return (
    <MDBox>
      <EmployeeModal
        open={open}
        onClose={handleClose}
        onSuccess={() => {
          setOpen(false);
          handleSalary();
        }}
      />
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSalary}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ my: 1, mx: 1 }}
            onChange={(evt) => setSearch(evt.target.value)}
            onKeyDown={handleKeyDown}
            value={search}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          rows={empSalary}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import AccountModal from "../modal/account/account-add-modal";
import SalaryModal from "../modal/employee/employee-salary";
import EmployeeUpdateModal from "../modal/employee/employee-update-modal";
import employeeService from "../../../../../services/employee-service";
import EmployeeModal from "../modal/employee/employee-add-modal";

export default function EmployeeData() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [accountModalOpen, setAccountModalOpen] = React.useState(false);
  const [SalaryModalOpen, setSalaryModalOpen] = React.useState(false);

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

  const handleUpdateClick = (params) => {
    setSelected(params.row);
    setUpdateModalOpen(true);
  };

  const handleAccountClick = (params) => {
    setSelected(params.row);
    setAccountModalOpen(true);
  };

  const handleSalaryClick = (params) => {
    setSelected(params.row);
    setSalaryModalOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
    setSelected(null);
  };

  const handleAccountClose = () => {
    setAccountModalOpen(false);
    setSelected(null);
  };

  const handleSalaryClose = () => {
    setSalaryModalOpen(false);
    setSelected(null);
  };

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "middleName", headerName: "Middlename", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    { field: "mobileNumber", headerName: "Mobile Number", type: "string", width: 200 },
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
          onClick={() => handleUpdateClick(params)}
          label="Update"
        />,
        <EmployeeUpdateModal
          open={params.id === selected?.id && updateModalOpen}
          onClose={handleUpdateClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSearch();
          }}
        />,
        <GridActionsCellItem
          icon={<PersonAddIcon />}
          onClick={() => handleAccountClick(params)}
          label="Add Account"
        />,
        <AccountModal
          open={params.id === selected?.id && accountModalOpen}
          onClose={handleAccountClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSearch();
          }}
        />,
        <GridActionsCellItem
          icon={<MonetizationOnIcon />}
          onClick={() => handleSalaryClick(params)}
          label="Add Salary"
        />,
        <SalaryModal
          open={params.id === selected?.id && SalaryModalOpen}
          onClose={handleSalaryClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSearch();
          }}
        />,
      ],
    },
  ]);

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MDBox>
      <EmployeeModal
        open={open}
        onClose={handleClose}
        onSuccess={() => {
          setOpen(false);
          handleSearch();
        }}
      />
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
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ my: 1, mx: 1 }}
            onChange={(evt) => setSearch(evt.target.value)}
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

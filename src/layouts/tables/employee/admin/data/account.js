import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import accountService from "services/account-service";
import AccountUpdateModal from "../modal/account/account-update-modal";
import AccountModal from "../modal/account/account-add-modal";

export default function AccountData() {
  const [accounts, setAccounts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);

  const UpdateHandleClose = () => setSelected(null);
  const handleSearch = () => {
    setLoading(true);
    accountService
      .searchAccounts(search)
      .then((e) => {
        setAccounts(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID", width: 230, textAlign: "center" },
    { field: "username", headerName: "Username", width: 230 },
    { field: "role", headerName: "Role", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 230,
      valueGetter: (params) => ["Disabled", "Active", "Inactive"][params?.row?.status] || "Unknown",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 230,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setSelected(params.row)}
          label="Update"
        />,
        <AccountUpdateModal
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
  ]);

  const handleSearchChange = (evt) => {
    setSearch(evt.target.value);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MDBox>
      <AccountModal
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
            Add Account
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
            onChange={handleSearchChange}
            value={search}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          getRowId={(row) => row?.id}
          rows={accounts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

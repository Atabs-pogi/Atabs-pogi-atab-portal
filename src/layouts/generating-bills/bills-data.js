import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import generatingBills from "services/generating-bills";
import BillsModal from "./bills-modal";
import BillsViewModal from "./view";

export default function EmployeeData() {
  const [bills, setBills] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    setLoading(true);
    generatingBills
      .getGeneratedBills(search)
      .then((e) => {
        setBills(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID", width: 100 },
    { field: "monthYear", headerName: "Date", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 200 },
    {
      field: "items",
      headerName: "Total Items",
      width: 150,
      valueGetter: (params) => params?.row?.items.length || 0,
      type: "number",
    },
    { field: "importDate", headerName: "Import Date", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => setSelected(params?.row)}
          label="Viewing"
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
      <BillsModal
        open={open}
        onClose={handleClose}
        onSuccess={() => {
          setOpen(false);
          handleSearch();
        }}
      />
      <BillsViewModal
        open={selected?.id}
        onClose={() => {
          setSelected(null);
        }}
        selected={selected}
      />
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }}>
          <MDButton variant="contained" onClick={handleOpen} color="success" sx={{ ml: 2 }}>
            <AddIcon sx={{ mr: 1 }} />
            Generate Bills
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
          rows={bills}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

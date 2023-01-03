import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import costingBillService from "services/costing-bill-service";
import CostingBillModal from "../modal/costing-bill/costingBill-add-modal";
import CostingBillModalUpdateModal from "../modal/costing-bill/costingBill-update-modal";

export default function FiberData() {
  const [costingBills, setCostingBills] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);

  const UpdateHandleClose = () => setSelected(null);
  const handleSearch = () => {
    setLoading(true);
    costingBillService
      .searchBills(search)
      .then((e) => {
        setCostingBills(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "name", headerName: "Name", width: 400 },
    { field: "type", headerName: "Type", width: 400 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 400,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setSelected(params.row)}
          label="Update"
        />,
        <CostingBillModalUpdateModal
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
      <CostingBillModal
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
            Add Product
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
          getRowId={(row) => row.id}
          rows={costingBills}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import merchantService from "services/merchant-prod-service";
import MerchantProdModal from "../modal/merchant-prod/merchant-add-modal";
import MerchantProdUpdateModal from "../modal/merchant-prod/merchant-update-modal";

export default function MerchantData() {
  const [merchantProd, setMerchantProd] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);

  const UpdateHandleClose = () => setSelected(null);
  const handleSearch = () => {
    setLoading(true);
    merchantService
      .getAllMerchProd(search)
      .then((res) => {
        setMerchantProd(res?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "item", headerName: "Item", width: 400 },
    { field: "price", headerName: "Price", width: 300 },
    { field: "quantity", headerName: "Quantity", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      valueGetter: (params) => ["Inactive", "Active"][params?.row?.status] || "Unknown",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setSelected(params.row)}
          label="Update"
        />,
        <MerchantProdUpdateModal
          open={params.id === selected?.productId}
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
      <MerchantProdModal
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
          getRowId={(row) => row.productId}
          rows={merchantProd}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

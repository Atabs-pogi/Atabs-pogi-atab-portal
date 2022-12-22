import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import posService from "services/pos-service";
import CashierSummaryModal from "./summary-modal";
import PosConfirmModal from "./pos-confirm-modal";

export default function PosHistory() {
  const [pos, setPos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const [selected, setSelected] = React.useState(null);
  const UpdateHandleClose = () => setSelected(null);

  const handleSearch = () => {
    setLoading(true);
    posService
      .searchPos(search)
      .then((e) => {
        setPos(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmSuccess = () => {
    setConfirmOpen(true);
  };

  const handleSummaryClose = () => {
    setConfirmOpen(false);
  };

  const handleSuccessSummary = () => {
    setConfirmOpen(false);
    setSelected(null);
    handleSearch();
  };

  const columns = React.useMemo(() => [
    { field: "transactionsId", headerName: "Transaction ID", width: 200 },
    { field: "farmerId", headerName: "Farmer ID", width: 200 },
    {
      field: "items",
      headerName: "Total Items",
      width: 100,
      valueGetter: (params) => params?.row?.items.length || 0,
      type: "number",
    },
    { field: "totalAmount", headerName: "Total Amount", width: 150, type: "number" },
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
      <PosConfirmModal
        open={selected?.transactionsId}
        onClose={UpdateHandleClose}
        selected={selected}
        onSuccess={handleConfirmSuccess}
      />
      <CashierSummaryModal
        onSuccess={handleSuccessSummary}
        open={confirmOpen}
        transId={selected?.transactionsId}
        onClose={handleSummaryClose}
      />
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
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
          getRowId={(row) => row?.transactionsId}
          rows={pos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import posService from "services/pos-service";
import MDButton from "components/MDButton";
import { useUserContext } from "user-context/user-context";
import ConfirmModal from "./confirm-modal";
import CashierSummaryModal from "./summary-modal";

export default function PosHistory() {
  const [pos, setPos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState(1);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [user] = useUserContext();

  const [selected, setSelected] = React.useState(null);
  const UpdateHandleClose = () => setSelected(null);

  const allowRelease = ["cashier", "admin"].indexOf(user?.info?.role) > -1;
  console.log(selected);
  const handleSearch = () => {
    setLoading(true);
    posService
      .getTransaction(allowRelease ? status : "")
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
    { field: "transactionsId", headerName: "Transaction ID", width: 200, sortable: true },
    { field: "farmerId", headerName: "Farmer ID", width: 150, sortable: true },
    {
      field: "items",
      headerName: "Total Items",
      width: 100,
      valueGetter: (params) => params?.row?.items.length || 0,
      type: "number",
    },
    { field: "totalAmount", headerName: "Total Amount", width: 150, type: "number" },
    { field: "transactionDate", headerName: "Transaction Date", width: 200 },
    { field: "releaseDate", headerName: "Release Data", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: true,
      valueGetter: (params) =>
        ["Cancelled", "Unrelease", "Released"][params?.row?.status] || "Unknown",
    },
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
  }, [status]);

  return (
    <MDBox>
      <ConfirmModal
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
        <Grid item xs={6} sx={{ padding: 1 }}>
          {allowRelease && (
            <>
              <MDButton
                variant="contained"
                color={status === 1 ? "secondary" : "info"}
                size="sm"
                sx={{ mr: 2, width: "100px" }}
                onClick={() => setStatus(1)}
              >
                Unrelease
              </MDButton>
              <MDButton
                variant="contained"
                color={status === 2 ? "secondary" : "info"}
                size="sm"
                sx={{ mr: 2, width: "100px" }}
                onClick={() => setStatus(2)}
              >
                Released
              </MDButton>
            </>
          )}
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
          getRowId={(row) => row?.transactionsId}
          rows={pos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: "transactionsId", sort: "desc" }],
            },
          }}
          columnVisibilityModel={{
            // Hide columns status and traderName, the other columns will remain visible
            transactionDate: status === 1,
            releaseDate: status === 2,
          }}
        />
      </div>
    </MDBox>
  );
}

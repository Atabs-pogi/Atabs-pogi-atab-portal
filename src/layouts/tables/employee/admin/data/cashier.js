import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import posService from "services/pos-service";
import PosModal from "../modal/pos/pos-add-modal";
import PosUpdateModal from "../modal/pos/pos-update-modal";

export default function CashierPosData() {
  const [pos, setPos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

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

  const columns = React.useMemo(() => [
    { field: "id", headerName: "Transaction ID", width: 250 },
    { field: "farmerId", headerName: "Farmer ID", width: 250 },
    { field: "plantTotal", headerName: "Plant Total", width: 150 },
    {
      field: "items",
      headerName: "Items",
      width: 400,
      renderCell: (params) => (
        <Box>
          {params?.row?.items?.map((item) => (
            <span>
              {item?.plantName} {item?.plantGrade} {item?.plantKilogram} {item?.plantPrice}
            </span>
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => setSelected(params.row)}
          label="Update"
        />,
        <PosUpdateModal
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params.row}
          onSuccess={() => {
            setSelected(null);
            handleSearch();
          }}
          info={params.row}
        />,
      ],
    },
  ]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MDBox>
      <PosModal
        open={open}
        onClose={handleClose}
        onSuccess={() => {
          setOpen(false);
          handleSearch();
        }}
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
            onChange={(evt) => setSearch(evt.target.value)}
            onKeyDown={handleKeyDown}
            value={search}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
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

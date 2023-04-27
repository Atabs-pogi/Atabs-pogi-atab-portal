import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import tuxyService from "services/tuxy-service";
import Moment from "react-moment";
import TuxyModal from "../modal/tuxy/tuxy-add-modal";
import TuxyViewModal from "../modal/tuxy/tuxy-update-modal";

export default function TuxyData() {
  const [tuxys, setTuxys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);

  const UpdateHandleClose = () => setSelected(null);
  const handleSearch = () => {
    setLoading(true);
    tuxyService
      .searchTuxy(search)
      .then((e) => {
        setTuxys(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "tuxyId", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "createDate",
      headerName: "Date Created",
      renderCell: ({ row }) =>
        row?.createDate && <Moment format="MM/DD/YYYY">{row?.createDate}</Moment>,
      width: 200,
    },
    {
      field: "goodPrice",
      headerName: "Good",
      width: 150,
      type: "number",
    },
    {
      field: "discardedPrice",
      headerName: "Discarded/Outer Fiber",
      width: 200,
      type: "number",
    },
    {
      field: "resecoPrice",
      headerName: "Reseco",
      width: 100,
      type: "number",
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
          onClick={() => setSelected(params?.row)}
          label="Update"
        />,
        <TuxyViewModal
          open={params?.row?.tuxyId === selected?.tuxyId}
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
      <TuxyModal
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
            Add Tuxy
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
            onKeyDown={handleKeyDown}
            value={search}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          getRowId={(row) => row.tuxyId}
          rows={tuxys}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

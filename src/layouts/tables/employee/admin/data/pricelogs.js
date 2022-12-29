import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import priceLogService from "services/price-log-service";

export default function TuxyData() {
  const [pricelogs, setPriceLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleSearch = () => {
    setLoading(true);
    priceLogService
      .searchPriceLogs(search)
      .then((e) => {
        setPriceLogs(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "tuxyName", headerName: "Tuxy Name", width: 150 },
    { field: "action", headerName: "Action", type: "action:", width: 450 },
    {
      field: "updatedBy",
      headerName: "Updated By",
      width: 200,
    },
    { field: "createDate", headerName: "Date Created", width: 300 },
  ]);

  const handleSearchChange = (evt) => {
    setSearch(evt.target.value);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <MDBox>
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }} />
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
          rows={pricelogs}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import priceLogService from "services/price-log-service";
import MDButton from "components/MDButton";

export default function PriceLogsData() {
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
    { field: "tuxyName", headerName: "Tuxy Name", width: 250 },
    { field: "action", headerName: "Action", type: "action:", width: 550 },
    // {
    //   field: "updatedBy",
    //   headerName: "Updated By",
    //   width: 200,
    // },
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
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <MDButton variant="contained" color="success" sx={{ mr: 2, my: 1 }}>
            <DownloadIcon sx={{ mr: 1 }} />
            Download
          </MDButton>
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
          initialState={{
            sorting: {
              sortModel: [{ field: "createDate", sort: "desc" }],
            },
          }}
        />
      </div>
    </MDBox>
  );
}

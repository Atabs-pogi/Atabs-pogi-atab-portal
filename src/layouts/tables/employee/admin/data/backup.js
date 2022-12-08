import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";

import backupService from "../../../../../services/backup-service";

export default function BackupData() {
  const [backupdata, setBackupData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    backupService
      .getBackupList()
      .then((e) => setBackupData(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addBackup = () => {
    setLoading(true);
    backupService
      .saveBackup()
      .then((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID", width: 350, align: "left" },
    { field: "location", headerName: "Location", width: 600, align: "left" },
    { field: "timestamp", headerName: "Timestamp", width: 600, align: "left" },
  ]);

  return (
    <MDBox>
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }}>
          <MDButton variant="contained" onClick={addBackup} color="success" sx={{ ml: 2 }}>
            <AddIcon sx={{ mr: 1 }} />
            Backup
          </MDButton>
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          rows={backupdata}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
    </MDBox>
  );
}

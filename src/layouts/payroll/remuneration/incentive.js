import { Grid, TextField } from "@mui/material";
import React from "react";

export default function Incentive() {
  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <TextField
          id="outlined-basic"
          name="amount"
          label="Amount"
          variant="outlined"
          sx={{ mb: 4, width: "25%" }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} sx={{ textAlign: "right" }}>
        <TextField
          id="outlined-basic"
          name="amount"
          label="Amount"
          variant="outlined"
          sx={{ mb: 4, width: "25%" }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

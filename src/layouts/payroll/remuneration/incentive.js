import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

export default function Incentive({ ...props }) {
  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Description</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ width: "37vh", height: "45px" }}
            {...props}
          >
            <MenuItem value="advance">Advance</MenuItem>
            <MenuItem value="more">More</MenuItem>
          </Select>
        </FormControl>
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

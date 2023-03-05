import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";

export default function Benefits({ loading, value, onChange, label }) {
  return (
    <MDBox sx={{ mx: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
            {label} :
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            name="sss"
            value={value}
            label={label}
            onChange={onChange}
            disabled={loading}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

Benefits.defaultProps = {
  loading: false,
  value: 0,
  onChange: () => {},
};

Benefits.propTypes = {
  loading: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
};

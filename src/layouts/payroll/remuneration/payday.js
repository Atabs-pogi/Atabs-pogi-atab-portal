import React from "react";
import { TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import Moment from "react-moment";

export default function Payday({
  loading,
  date,
  regular,
  ot,
  tardiness,
  vacation,
  sick,
  onChange,
}) {
  const handleChangeRegular = (evt) => {
    onChange?.({
      date,
      regular: parseFloat(evt.target.value) || 0,
      ot,
      tardiness,
      vacation,
      sick,
    });
  };

  const handleChangeOt = (evt) => {
    onChange?.({
      date,
      regular,
      ot: parseFloat(evt.target.value) || 0,
      tardiness,
      vacation,
      sick,
    });
  };

  const handleChangeTardiness = (evt) => {
    onChange?.({
      date,
      regular,
      ot,
      tardiness: parseFloat(evt.target.value) || 0,
      vacation,
      sick,
    });
  };

  const handleChangeVacation = (evt) => {
    onChange?.({
      date,
      regular,
      ot,
      tardiness,
      vacation: parseFloat(evt.target.value) || 0,
      sick,
    });
  };
  const handleChangeSick = (evt) => {
    onChange?.({
      date,
      regular,
      ot,
      tardiness,
      vacation,
      sick: parseFloat(evt.target.value) || 0,
    });
  };

  return (
    <MDBox sx={{ display: "flex", flexDirection: "row" }}>
      <Typography variant="h3" component="h2" sx={{ fontSize: 17, m: 1 }}>
        <Moment format="MM/DD/YYYY">{date}</Moment>
      </Typography>
      <TextField
        id="outlined-basic"
        name="username"
        label="Hours"
        value={regular}
        variant="outlined"
        disabled={loading}
        onChange={handleChangeRegular}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        name="username"
        label="Overtime"
        value={ot}
        variant="outlined"
        disabled={loading}
        onChange={handleChangeOt}
        sx={{ mb: 2, mx: 2 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        name="username"
        label="Tardiness"
        value={tardiness}
        variant="outlined"
        disabled={loading}
        onChange={handleChangeTardiness}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        name="username"
        label="Vacation"
        value={vacation}
        variant="outlined"
        disabled={loading}
        onChange={handleChangeVacation}
        sx={{ mb: 2, mx: 2 }}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        name="username"
        label="Sick"
        value={sick}
        variant="outlined"
        disabled={loading}
        onChange={handleChangeSick}
        sx={{ mb: 2, mr: 2 }}
        fullWidth
      />
    </MDBox>
  );
}

Payday.defaultProps = {
  loading: false,
  date: null,
  regular: 0,
  ot: 0,
  tardiness: 0,
  vacation: 0,
  sick: 0,
  onChange: () => {},
};
// Typechecking props of the MDAlert
Payday.propTypes = {
  loading: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  regular: PropTypes.number,
  ot: PropTypes.number,
  tardiness: PropTypes.number,
  vacation: PropTypes.number,
  sick: PropTypes.number,
  onChange: PropTypes.func,
};

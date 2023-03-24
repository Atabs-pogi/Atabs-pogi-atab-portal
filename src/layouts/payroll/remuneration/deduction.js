import React, { useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

function DeductionModule({ deductions, onDeductionsChange }) {
  const [localDeductions, setLocalDeductions] = useState(deductions);

  React.useEffect(() => {
    setLocalDeductions(deductions);
  }, [deductions]);

  const handleAddDeduction = () => {
    const newDeductions = [...localDeductions, { payrollId: 0, description: "", value: "" }];
    setLocalDeductions(newDeductions);
    onDeductionsChange(newDeductions);
  };
  const handleDeleteDeduction = (index) => {
    const newDeductions = [...localDeductions];
    newDeductions.splice(index, 1);
    setLocalDeductions(newDeductions);
    onDeductionsChange(newDeductions);
  };

  const handleChangeDeductionType = (index, event) => {
    const newDeductions = [...localDeductions];
    newDeductions[index].description = event.target.value;
    setLocalDeductions(newDeductions);
    onDeductionsChange(newDeductions);
  };

  const handleChangeDeductionAmount = (index, event) => {
    const newDeductions = [...localDeductions];
    newDeductions[index].value = event.target.value;
    setLocalDeductions(newDeductions);
    onDeductionsChange(newDeductions);
  };

  return (
    <MDBox>
      <MDBox>
        <IconButton variant="contained" color="info" onClick={handleAddDeduction}>
          <AddCircleIcon fontSize="large" color="success" sx={{ pl: 0 }} />
        </IconButton>
      </MDBox>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {deductions.map((deduction, index) => (
        <MDBox>
          <Grid sx={{ display: "flex", mx: "10vw", justifyContent: "space-between", pb: 4 }}>
            <Grid sx={{ textAlign: "center" }}>
              <IconButton
                variant="contained"
                color="info"
                onClick={() => handleDeleteDeduction(index)}
                sx={{ mr: 2 }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
            <Grid sx={{ textAlign: "center", width: "15vw" }}>
              <TextField
                type="text"
                label="Deduction Name"
                value={deduction.description}
                onChange={(event) => handleChangeDeductionType(index, event)}
                fullWidth
              />
            </Grid>
            <Grid sx={{ textAlign: "center", width: "15vw" }}>
              <TextField
                type="number"
                label="Deduction Amount"
                value={deduction.value}
                onChange={(event) => handleChangeDeductionAmount(index, event)}
                fullWidth
              />
            </Grid>
          </Grid>
        </MDBox>
      ))}
      <Typography sx={{ mt: 4, mx: "10vw", textAlign: "right" }}>
        Total Deductions:&nbsp; {/* eslint-disable-next-line react/destructuring-assignment */}
        {deductions.reduce((total, deduction) => total + Number(deduction.value), 0)}
      </Typography>
    </MDBox>
  );
}

export default DeductionModule;

DeductionModule.defaultProps = {
  deductions: [],
  onDeductionsChange: () => {},
};

DeductionModule.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  deductions: PropTypes.array,
  onDeductionsChange: PropTypes.func,
};

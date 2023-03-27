import React from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

export default function Benefits({ benefits, onBenefitsChange }) {
  const [localBenefits, setLocalBenefits] = React.useState(benefits);

  React.useEffect(() => {
    setLocalBenefits(benefits);
  }, [benefits]);

  const handleAddBenefit = () => {
    const newBenefits = [...localBenefits, { description: "", value: "" }];
    setLocalBenefits(newBenefits);
    onBenefitsChange(newBenefits);
  };
  const handleDeleteBenefit = (index) => {
    const newBenefits = [...localBenefits];
    newBenefits.splice(index, 1);
    setLocalBenefits(newBenefits);
    onBenefitsChange(newBenefits);
  };

  const handleChangeBenefitType = (index, event) => {
    const newBenefits = [...localBenefits];
    newBenefits[index].description = event.target.value;
    setLocalBenefits(newBenefits);
    onBenefitsChange(newBenefits);
  };

  const handleChangeBenefitAmount = (index, event) => {
    const newBenefits = [...localBenefits];
    newBenefits[index].value = event.target.value;
    setLocalBenefits(newBenefits);
    onBenefitsChange(newBenefits);
  };
  return (
    <MDBox>
      <MDBox>
        <IconButton variant="contained" color="info" onClick={handleAddBenefit}>
          <AddCircleIcon fontSize="large" color="success" sx={{ pl: 0 }} />
        </IconButton>
      </MDBox>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {benefits.map((benefit, index) => (
        <MDBox>
          <Grid sx={{ display: "flex", mx: "10vw", justifyContent: "space-between", pb: 4 }}>
            <Grid sx={{ textAlign: "center" }}>
              <IconButton
                variant="contained"
                color="info"
                onClick={() => handleDeleteBenefit(index)}
                sx={{ mr: 2 }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
            <Grid sx={{ textAlign: "center", width: "15vw" }}>
              <TextField
                type="text"
                label="Benefit Type"
                value={benefit.description}
                onChange={(event) => handleChangeBenefitType(index, event)}
                fullWidth
              />
            </Grid>
            <Grid sx={{ textAlign: "center", width: "15vw" }}>
              <TextField
                type="number"
                label="Benefit Amount"
                value={benefit.value}
                onChange={(event) => handleChangeBenefitAmount(index, event)}
                fullWidth
              />
            </Grid>
          </Grid>
        </MDBox>
      ))}
      <Typography sx={{ mt: 4, mx: "10vw", textAlign: "right" }}>
        Total Benefits:&nbsp; {/* eslint-disable-next-line react/destructuring-assignment */}
        {benefits.reduce((total, benefit) => total + Number(benefit.value), 0)}
      </Typography>
    </MDBox>
  );
}

Benefits.defaultProps = {
  benefits: [],
  onBenefitsChange: () => {},
};

Benefits.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  benefits: PropTypes.array,
  onBenefitsChange: PropTypes.func,
};

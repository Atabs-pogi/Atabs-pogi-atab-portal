import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldDatePicker from "../textfields/date-picker";
import "./index.css";

export default function EmployeeModal({ open, onClose }) {
  const handleClose = () => {
    onClose?.();
  };
  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={{ textAlign: "center" }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", maxHeight: "100vh", overflowX: "auto" }}
          >
            <Grid item xs={6}>
              <Card>
                <MDBox sx={{ textAlign: "right", fontSize: "30px", pr: 1 }}>
                  <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                </MDBox>
                <div className="textfields">
                  <Typography variant="h3" component="h2" sx={{ fontSize: 18 }}>
                    Employee Information
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Lastname"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Firstname"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Middlename (Optional)"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                  />
                  <TextFieldDatePicker />
                  <TextField
                    id="outlined-basic"
                    label="Sex"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email (Required)"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2, width: 220 }}
                  />
                  <Box>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, mt: 4 }}>
                      Employee Address
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="House no."
                      variant="outlined"
                      sx={{ mr: 2, mt: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Unit"
                      variant="outlined"
                      sx={{ mr: 2, mt: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Barangay"
                      variant="outlined"
                      sx={{ mr: 2, mt: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      sx={{ mr: 2, mt: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Province"
                      variant="outlined"
                      sx={{ mr: 2, mt: 2 }}
                    />
                    <MDBox sx={{ textAlign: "center" }}>
                      <MDButton
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 200 }}
                      >
                        Add
                      </MDButton>
                    </MDBox>
                  </Box>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

EmployeeModal.defaultProps = {
  open: false,
  onClose: () => {},
};
// Typechecking props of the MDAlert
EmployeeModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

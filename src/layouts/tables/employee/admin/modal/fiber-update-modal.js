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

export default function FiberUpdateModal({ selected, open, onClose }) {
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
                  <Typography variant="h3" component="h2" sx={{ fontSize: 18, mr: 2 }}>
                    Farmer Information
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Lastname"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                    defaultValue={selected?.row?.lastName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Firstname"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                    defaultValue={selected?.row?.firstName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Middlename (Optional)"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                    defaultValue={selected?.row?.middleName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                    defaultValue={selected?.row?.mobileNumber}
                  />
                  <TextFieldDatePicker label="Birthday" value={selected?.row?.birthday} />
                  <TextField
                    id="outlined-basic"
                    label="Sex"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2 }}
                    defaultValue={selected?.row?.sex}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email (Required)"
                    variant="outlined"
                    sx={{ mr: 2, mt: 2, width: 220 }}
                    defaultValue={selected?.row?.email}
                  />

                  <Box>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, mt: 4, mr: 2 }}>
                      Farmer Address
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
                      <MDButton variant="contained" color="info" sx={{ mr: 2, mt: 5, width: 200 }}>
                        Update
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

FiberUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
};

// Typechecking props of the MDAlert
FiberUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

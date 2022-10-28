import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import farmerImg from "assets/images/small-logos/farmer.jpg";
import TextFieldDatePicker from "../textfields/date-picker";
import SelectSex from "../textfields/select-sex";
import SelectRole from "../textfields/select-role";

export default function FarmerModal({ open, onClose }) {
  const handleClose = () => {
    onClose?.();
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh", maxHeight: "100vh", overflowX: "auto" }}
        >
          <Grid item xs={6}>
            <Card sx={{ width: "180vh", height: "95vh", flexDirection: "row", display: "flex" }}>
              <MDBox
                component="img"
                src={farmerImg}
                alt="Logo"
                height="100%"
                width="20%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                  mr: 7,
                }}
              />
              <MDBox sx={{ flexGrow: 1 }}>
                <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                    <IconButton>
                      <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </MDBox>
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Farmer Information
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Lastname"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Firstname"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Middlename (Optional)"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          type="number"
                          sx={{ mt: 2, pr: 7 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography variant="h2" component="span" sx={{ fontSize: "15px" }}>
                                  +63
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Email (Required)"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectSex />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <TextFieldDatePicker />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectRole />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Farmer Address
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="House no."
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Unit"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Barangay"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Province"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                      >
                        Save
                      </MDButton>
                      <MDButton
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                        onClick={handleClose}
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  );
}

FarmerModal.defaultProps = {
  open: false,
  onClose: () => {},
};
// Typechecking props of the MDAlert
FarmerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

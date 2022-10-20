import React from "react";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
// import doaLogo from "assets/images/small-logos/doa-logo.png";
import employeeImg from "assets/images/small-logos/employee1.jpg";
import TextFieldDatePicker from "../textfields/date-picker";
import SelectSex from "../textfields/select-sex";
import SelectRole from "../textfields/select-role";

export default function EmployeeUpdateModal({ selected, open, onClose }) {
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
            <Card sx={{ width: "130vh", height: "95vh", flexDirection: "row", display: "flex" }}>
              <MDBox
                component="img"
                src={employeeImg}
                alt="Logo"
                height="100%"
                width="30%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                  mr: 2,
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
                      Employee Information
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Lastname"
                          variant="outlined"
                          defaultValue={selected?.row?.lastName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Firstname"
                          variant="outlined"
                          defaultValue={selected?.row?.firstName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Middlename (Optional)"
                          variant="outlined"
                          defaultValue={selected?.row?.middleName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Mobile Number"
                          variant="outlined"
                          sx={{ mt: 2 }}
                          defaultValue={selected?.row?.mobileNumber}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Email (Required)"
                          variant="outlined"
                          sx={{ mt: 2 }}
                          defaultValue={selected?.row?.email}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectSex value={selected?.row?.sex} />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <TextFieldDatePicker value={selected?.row?.birthday} />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectRole />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Employee Address
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField id="outlined-basic" label="House no." variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Unit" variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Barangay" variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                          sx={{ mt: 2 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Province"
                          variant="outlined"
                          sx={{ mt: 2 }}
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

EmployeeUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
EmployeeUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

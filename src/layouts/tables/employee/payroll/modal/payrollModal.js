import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  // eslint-disable-next-line no-unused-vars
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import employeeImg from "assets/images/small-logos/image1.png";
// import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import TextFieldDatePicker from "../../admin/textfields/date-picker";
// import TextFieldDatePicker from "../textfields/date-picker";
// import SelectSex from "../textfields/select-sex";
// import SelectRole from "../textfields/select-role";

export default function PayrollModal({ open, onClose }) {
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
                src={employeeImg}
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
                    <Typography variant="h3" component="h2" sx={{ fontSize: 16, my: 2 }}>
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
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.lastName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Firstname"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          readOnly
                          // defaultValue={selected?.row?.firstName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Middlename (Optional)"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.middleName}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Address"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          // defaultValue={selected?.row?.address}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Position"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          // defaultValue={selected?.row?.position}
                        />
                      </Grid>
                    </Grid>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 16, my: 2 }}>
                        Payroll Information
                      </Typography>
                    </MDBox>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Work From"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.workfrom}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Wage"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7, mt: 2 }}
                          // defaultValue={selected?.row?.perDaySalary}
                        />
                        <TextField
                          id="outlined-basic"
                          label="SSS"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7, mt: 2 }}
                          readOnly
                          // defaultValue={selected?.row?.sss}
                        />
                        <Divider />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Work To"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          readOnly
                          // defaultValue={selected?.row?.workto}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Taxes"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7, mt: 2 }}
                          readOnly
                          // defaultValue={selected?.row?.taxes}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Total days"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          readOnly
                          // defaultValue={selected?.row?.totalDays}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Pag-ibig"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7, mt: 2 }}
                          readOnly
                          // defaultValue={selected?.row?.pagibig}
                        />
                      </Grid>
                    </Grid>
                    {/* <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Total Deduction"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.totaldeduction}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Gross Income"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.grossincome}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Net Income"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          // defaultValue={selected?.row?.netincome}
                        />
                      </Grid>
                    </Grid> */}
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

PayrollModal.defaultProps = {
  open: false,
  onClose: () => {},
  // selected: null,
};
// Typechecking props of the MDAlert
PayrollModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  // selected: PropTypes.object,
};

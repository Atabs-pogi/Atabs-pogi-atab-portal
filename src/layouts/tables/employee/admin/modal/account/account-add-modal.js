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
import employeeImg from "assets/images/small-logos/employee1.jpg";
import employeeService from "services/employee-service";
import { useFormik } from "formik";
import TextFieldDatePicker from "../../textfields/date-picker";
import SelectSex from "../../textfields/select-sex";
import SelectRole from "../../textfields/select-role";
import EmpSchema from "../schema/employee-schema";

export default function EmployeeModal({ open, onClose, onSuccess }) {
  const [employee, setEmployee] = React.useState({});
  const [address, setAddress] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newEmployee = {
      ...employee,
      address,
    };
    employeeService
      .addEmployee(newEmployee)
      .then(() => {
        setAddress({});
        setEmployee({});
        onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      lastName: "",
    },
    validationSchema: EmpSchema,
    // onSubmit,
  });
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
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Employee Information
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                          <TextField
                            id="outlined-basic"
                            name="lastName"
                            label="Lastname"
                            value={formik.values.lastName}
                            defaultValue={employee?.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            variant="outlined"
                            fullWidth
                          />
                          <MDButton
                            type="submit"
                            name="login-btn"
                            variant="contained"
                            fullWidth
                            color="success"
                          >
                            Login
                          </MDButton>
                        </form>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Firstname"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={employee?.firstName}
                          onChange={(evt) =>
                            setEmployee({ ...employee, firstName: evt.target.value })
                          }
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Middlename (Optional)"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={employee?.middleName}
                          onChange={(evt) =>
                            setEmployee({ ...employee, middleName: evt.target.value })
                          }
                          sx={{ pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={employee?.mobileNumber}
                          onChange={(evt) =>
                            setEmployee({ ...employee, mobileNumber: evt.target.value })
                          }
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
                          disabled={loading}
                          defaultValue={employee?.email}
                          onChange={(evt) => setEmployee({ ...employee, email: evt.target.value })}
                          sx={{ mt: 2, pr: 7 }}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectSex
                          disabled={loading}
                          value={employee?.sex}
                          onChange={(evt) => setEmployee({ ...employee, sex: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <TextFieldDatePicker
                          disabled={loading}
                          value={employee?.birthday}
                          onChange={(evt) => setEmployee({ ...employee, birthday: evt })}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectRole
                          disabled={loading}
                          value={employee?.role}
                          onChange={(evt) => setEmployee({ ...employee, role: evt.target.value })}
                        />
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
                        <TextField
                          id="outlined-basic"
                          label="House no."
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.houseNo}
                          onChange={(evt) => setAddress({ ...address, houseNo: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Unit"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.unit}
                          onChange={(evt) => setAddress({ ...address, unit: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Barangay"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.barangay}
                          onChange={(evt) => setAddress({ ...address, barangay: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={address?.city}
                          onChange={(evt) => setAddress({ ...address, city: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Province"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={address?.province}
                          onChange={(evt) => setAddress({ ...address, province: evt.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                        onClick={handleSave}
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

EmployeeModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
EmployeeModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

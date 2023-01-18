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
import SelectSex from "../../textfields/select-sex";
import TextFieldDatePicker from "../../textfields/date-picker";
import employeeService from "../../../../../../services/employee-service";

export default function EmployeeUpdateModal({ selected, open, onClose, onSuccess }) {
  const { address: selectedAddress, ...selectedEmployee } = selected;
  const [employee, setEmployee] = React.useState(selectedEmployee);
  const [address, setAddress] = React.useState(selectedAddress);
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
      .updateEmployee(newEmployee)
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
                      Employee Information ({employee?.id})
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
                          disabled={loading}
                          defaultValue={employee.lastName}
                          onChange={(evt) =>
                            setEmployee({ ...employee, lastName: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Firstname"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          disabled={loading}
                          defaultValue={employee.firstName}
                          onChange={(evt) =>
                            setEmployee({ ...employee, firstName: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Middlename (Optional)"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={employee.middleName}
                          onChange={(evt) =>
                            setEmployee({ ...employee, middleName: evt.target.value })
                          }
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
                          defaultValue={employee.mobileNumber}
                          onChange={(evt) =>
                            setEmployee({ ...employee, mobileNumber: evt.target.value })
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography
                                  variant="h2"
                                  component="span"
                                  sx={{ fontSize: "15px", fontWeight: "400" }}
                                >
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
                          label="Email (Optional)"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={employee.email}
                          onChange={(evt) => setEmployee({ ...employee, email: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <SelectSex
                          value={employee.sex}
                          onChange={(evt) => setEmployee({ ...employee, sex: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4} mt={2}>
                        <TextFieldDatePicker
                          value={employee.birthday}
                          onChange={(evt) => setEmployee({ ...employee, birthday: evt })}
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
                  {/* ERROR MESSAGE */}
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleSave}
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

EmployeeUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
EmployeeUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  onSuccess: PropTypes.func,
};

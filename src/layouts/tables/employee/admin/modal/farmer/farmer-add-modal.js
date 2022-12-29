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
import farmerService from "services/farmer-service";
import { useFormik } from "formik";
import TextFieldDatePicker from "../../textfields/date-picker";
import SelectSex from "../../textfields/select-sex";
import farmerSchema, { initialFarmer } from "../schema/farmer-schema";

export default function FarmerModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialFarmer,

    validationSchema: farmerSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      farmerService
        .addFarmer(formik?.values)
        .then(() => {
          formik?.resetForm();
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                            name="lastName"
                            label="Lastname"
                            disabled={loading}
                            value={formik?.values?.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            variant="outlined"
                            sx={{ pr: 7 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Firstname"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Middlename (Optional)"
                            name="middleName"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.middleName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                            helperText={formik.touched.middleName && formik.errors.middleName}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Mobile Number"
                            name="mobileNumber"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.mobileNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
                            }
                            helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                            type="number"
                            sx={{ mt: 2, pr: 7 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography
                                    variant="h2"
                                    component="span"
                                    sx={{ fontSize: "15px" }}
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
                            name="email"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mt: 2, pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={4} mt={2}>
                          <SelectSex
                            name="sex"
                            disabled={loading}
                            value={formik.values.sex}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.sex && Boolean(formik.errors.sex)}
                            helperText={formik.touched.sex && formik.errors.sex}
                          />
                        </Grid>
                        <Grid item xs={4} mt={2}>
                          <TextFieldDatePicker
                            name="birthday"
                            disabled={loading}
                            value={formik.values.birthday}
                            onChange={(evt) =>
                              formik?.setFieldValue("birthday", evt?.toISOString(), true)
                            }
                            maxDate={new Date()}
                            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                            helperText={formik.touched.birthday && formik.errors.birthday}
                          />
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
                            name="address.houseNo"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            disabled={loading}
                            value={formik.values?.address?.houseNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.houseNo &&
                              Boolean(formik.errors?.address?.houseNo)
                            }
                            helperText={
                              formik.touched?.address?.houseNo && formik.errors?.address?.houseNo
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Unit"
                            name="address.unit"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            disabled={loading}
                            value={formik.values?.address?.unit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.unit && Boolean(formik.errors?.address?.unit)
                            }
                            helperText={
                              formik.touched?.address?.unit && formik.errors?.address?.unit
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Barangay"
                            name="address.barangay"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            value={formik.values?.address?.barangay}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.barangay &&
                              Boolean(formik.errors?.address?.barangay)
                            }
                            helperText={
                              formik.touched?.address?.barangay && formik.errors?.address?.barangay
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="City"
                            name="address.city"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, pr: 7 }}
                            disabled={loading}
                            value={formik.values?.address?.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.city && Boolean(formik.errors?.address?.city)
                            }
                            helperText={
                              formik.touched?.address?.city && formik.errors?.address?.city
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Province"
                            name="address.province"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, pr: 7 }}
                            value={formik.values?.address?.province}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.province &&
                              Boolean(formik.errors?.address?.province)
                            }
                            helperText={
                              formik.touched?.address?.province && formik.errors?.address?.province
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Postal No."
                            name="address.postalNo"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, pr: 7 }}
                            value={formik.values?.address?.postalNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.address?.postalNo &&
                              Boolean(formik.errors?.address?.postalNo)
                            }
                            helperText={
                              formik.touched?.address?.postalNo && formik.errors?.address?.postalNo
                            }
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                    {error}
                    {open && (
                      <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                        <MDButton
                          type="submit"
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
        </form>
      </MDBox>
    </Modal>
  );
}

FarmerModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
FarmerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

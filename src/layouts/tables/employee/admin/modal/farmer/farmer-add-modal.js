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
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import farmerImg from "assets/images/small-logos/farmer.jpg";
import farmerService from "services/farmer-service";
import { useFormik } from "formik";

import TextFieldDatePicker from "../../textfields/date-picker";
import SelectSex from "../../textfields/select-sex";
import EmpSchema, { initialFarmer } from "../schema/farmer-schema";
import "./index.css";

export default function FarmerModal({ open, onClose, onSuccess }) {
  const [image, setImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialFarmer,

    validationSchema: EmpSchema,

    onSubmit: () => {
      setError("");
      setLoading(true);
      farmerService
        .addFarmer(formik.values)
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

  function handleImage(e) {
    farmerService
      .createImgPath("FirstName", "Farmer", e.target.files[0])
      .then((res) => {
        formik.values.imageLocation = res.data;
        // onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImg(reader.result);
    };
  }
  // console.log(image);
  console.log(formik.values);

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

                    <MDBox
                      sx={{
                        display: "flex",
                        mb: 2,
                      }}
                    >
                      <MDBox sx={{ px: 2 }}>
                        <MDBox
                          id="farmerImg"
                          component="img"
                          alt=""
                          src={image}
                          sx={{
                            border: "solid 1px #aaa",
                            height: "230px",
                            width: "230px",
                            margin: "auto",
                          }}
                        />

                        <MDBox
                          className="upload-btn"
                          htmlFor="farmerimg"
                          mx={2}
                          sx={{
                            textAlign: "center",
                            padding: "8px 0",
                            backgroundColor: "#252525",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            variant="label"
                            component="label"
                            htmlFor="imgInput"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              fontSize: "small",
                              color: "#fff",
                            }}
                          >
                            <UploadIcon sx={{ mr: 1 }} />
                            Upload an Image
                          </Typography>
                        </MDBox>
                        <input id="imgInput" type="file" name="farmer_img" onChange={handleImage} />
                      </MDBox>

                      <MDBox className="modal-content" sx={{ flexGrow: 1, mt: 14, ml: 7 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={4}>
                            <TextField
                              id="outlined-basic"
                              name="lastName"
                              label="Lastname"
                              disabled={loading}
                              value={formik.values.lastName}
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
                          <Grid item xs={4} mt={2}>
                            <TextField
                              id="outlined-basic"
                              label="Facebook Account"
                              name="facebookAccount"
                              variant="outlined"
                              fullWidth
                              disabled={loading}
                              value={formik.values.facebookAccount}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBLur}
                              error={
                                formik.touched.facebookAccount &&
                                Boolean(formik.errors.facebookAccount)
                              }
                              helperText={
                                formik.touched.facebookAccount && formik.errors.facebookAccount
                              }
                              sx={{ pr: 7 }}
                            />
                          </Grid>
                          <Grid item xs={4} mt={2}>
                            <TextField
                              id="outlined-basic"
                              label="Viber Account"
                              name="viberAccount"
                              variant="outlined"
                              fullWidth
                              disabled={loading}
                              value={formik.values.viberAccount}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBLur}
                              error={
                                formik.touched.viberAccount && Boolean(formik.errors.viberAccount)
                              }
                              helperText={formik.touched.viberAccount && formik.errors.viberAccount}
                              sx={{ pr: 7 }}
                            />
                          </Grid>
                        </Grid>
                      </MDBox>
                    </MDBox>

                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="Affiliation"
                            name="affiliation"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.affiliation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.affiliation && Boolean(formik.errors.affiliation)}
                            helperText={formik.touched.affiliation && formik.errors.affiliation}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="Civil Status"
                            name="civilStatus"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.civilStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.civilStatus && Boolean(formik.errors.civilStatus)}
                            helperText={formik.touched.civilStatus && formik.errors.civilStatus}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="Educational Attainment"
                            name="educationalAttainment"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.educationalAttainment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.educationalAttainment &&
                              Boolean(formik.errors.educationalAttainment)
                            }
                            helperText={
                              formik.touched.educationalAttainment &&
                              formik.errors.educationalAttainment
                            }
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="Estimated Annual Income"
                            name="estimatedAnnualIncome"
                            variant="outlined"
                            type="number"
                            fullWidth
                            disabled={loading}
                            value={formik.values.estimatedAnnualIncome}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.estimatedAnnualIncome &&
                              Boolean(formik.errors.estimatedAnnualIncome)
                            }
                            helperText={
                              formik.touched.estimatedAnnualIncome &&
                              formik.errors.estimatedAnnualIncome
                            }
                            sx={{ pr: 7 }}
                          />
                        </Grid>

                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="No. Of Dependents"
                            name="noOfDependents"
                            type="number"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.noOfDependents}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.noOfDependents && Boolean(formik.errors.noOfDependents)
                            }
                            helperText={
                              formik.touched.noOfDependents && formik.errors.noOfDependents
                            }
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={3} mt={2}>
                          <TextField
                            id="outlined-basic"
                            label="Spouse"
                            name="spouse"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.spouse}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.spouse && Boolean(formik.errors.spouse)}
                            helperText={formik.touched.spouse && formik.errors.spouse}
                            sx={{ pr: 7 }}
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-basic"
                            label="City"
                            name="address.city"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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

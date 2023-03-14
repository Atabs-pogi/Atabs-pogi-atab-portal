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
import employeeImg from "assets/images/small-logos/employee1.jpg";
import employeeService from "services/employee-service";
import { useFormik } from "formik";
import TextFieldDatePicker from "../../textfields/date-picker";
import SelectSex from "../../textfields/select-sex";
import EmpSchema, { initialEmployee } from "../schema/employee-schema";

export default function EmployeeModal({ open, onClose, onSuccess }) {
  const [employeeCount, setemployeeCount] = React.useState(null);
  const [image, setImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialEmployee,

    validationSchema: EmpSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      employeeService
        .addEmployee(formik.values)
        .then(() => {
          formik?.resetForm();
          setImg(null);
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
    console.log(e.target.files[0]);

    employeeService
      .createImgPath(employeeCount, "Employee", e.target.files[0])
      .then((res) => {
        formik.values.imageLocation = `http://localhost:8080/upload/${res}`;
        setImg(res);
        // onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  employeeService
    .getEmployeeCount()
    .then((res) => {
      setemployeeCount(res.data + 1);
    })
    .catch((err) => {
      setError(err?.message);
    })
    .finally(() => {
      setLoading(false);
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
                    <MDBox
                      sx={{
                        display: "flex",
                        mb: 2,
                      }}
                    >
                      <MDBox>
                        <MDBox
                          component="img"
                          alt=""
                          src={image}
                          sx={{
                            border: "solid 1px #aaa",
                            padding: "20",
                            height: "230px",
                            width: "230px",
                            margin: "auto",
                            mb: 2,
                          }}
                        />

                        <MDBox
                          className="upload-btn"
                          htmlFor="imgInput"
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
                        <input
                          id="imgInput"
                          type="file"
                          name="employee_img"
                          onChange={handleImage}
                        />
                      </MDBox>
                      <MDBox className="modal-content" sx={{ flexGrow: 1, ml: 4 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={4}>
                            <TextField
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
                              label="Email (Required)"
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
                          <Grid item xs={4} mt={2} pr={7}>
                            <TextFieldDatePicker
                              label="Birthday"
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
                            type="number"
                            label="Postal No."
                            name="postalCode"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, pr: 7 }}
                            value={formik.values?.postalCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched?.postalCode && Boolean(formik.errors?.postalCode)}
                            helperText={formik.touched?.postalCode && formik.errors?.postalCode}
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

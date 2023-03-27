/* eslint-disable no-alert */
import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import accountImg from "assets/images/small-logos/account.jpg";
import empsalaryService from "services/empsalary-service";
import { useFormik } from "formik";
import dayjs from "dayjs";
import TextFieldDatePicker from "../../textfields/date-picker";
import EmpSalarySchema from "../schema/employee-salary-schema";

export default function SalaryUpdateModal({ selected, open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    onClose?.();
  };

  const { id: empId, ...empSalary } = selected || {};

  const formik = useFormik({
    initialValues: empSalary,

    validationSchema: EmpSalarySchema,
    onSubmit: () => {
      if (
        formik.values.effDate !== "" &&
        formik.values.effDate !== null &&
        formik.values.expDate !== "" &&
        formik.values.expDate !== null
      ) {
        setError("");
        setLoading(true);
        empsalaryService
          .updateSalary(formik.values)
          .then(() => {
            onSuccess?.();
          })
          .catch((err) => {
            setError(err?.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        alert("Some fields may not be specified yet");
      }
    },
  });

  const validateDateRange = (start, end) => {
    if (start && end) {
      if (new Date(start) >= new Date(end)) {
        alert("Effective date cannot be equal or later than the Expiry date.");
        formik.values.effDate = null;
        formik.values.expDate = null;
      }
    }
  };

  formik.values.employeeId = empSalary.employee.id;

  React.useEffect(() => {
    validateDateRange(formik.values.effDate, formik.values.expDate);
  }, [formik.values.effDate, formik.values.expDate]);

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
                  src={accountImg}
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
                        Employee Salary Update ({empSalary.employee.id})
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container sx={{ width: "90%" }}>
                        <Grid item xs={6} mt={2}>
                          <Grid sx={{ mb: 4, width: "60%" }}>
                            <TextFieldDatePicker
                              label="Effective Date"
                              disabled={loading}
                              value={formik.values.effDate}
                              onChange={(evt) =>
                                formik?.setFieldValue(
                                  "effDate",
                                  dayjs(evt).format("YYYY-MM-DD"),
                                  true
                                )
                              }
                              error={formik.touched.effDate && Boolean(formik.errors.effDate)}
                              helperText={formik.touched.effDate && formik.errors.effDate}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <Grid sx={{ mb: 4, width: "60%" }}>
                            <TextFieldDatePicker
                              label="Expiry Date"
                              disabled={loading}
                              value={formik.values.expDate}
                              onChange={(evt) =>
                                formik?.setFieldValue(
                                  "expDate",
                                  dayjs(evt).format("YYYY-MM-DD"),
                                  true
                                )
                              }
                              error={formik.touched.expDate && Boolean(formik.errors.expDate)}
                              helperText={formik.touched.expDate && formik.errors.expDate}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            type="text"
                            label="Position"
                            name="position"
                            disabled={loading}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                            value={formik.values?.position}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched?.position && Boolean(formik.errors?.position)}
                            helperText={formik.touched?.position && formik.errors?.position}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            type="number"
                            label="Daily Basic"
                            name="dailyBasic"
                            disabled={loading}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                            value={formik.values?.dailyBasic}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched?.dailyBasic && Boolean(formik.errors?.dailyBasic)}
                            helperText={formik.touched?.dailyBasic && formik.errors?.dailyBasic}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            type="number"
                            name="bankAccountInfo"
                            label="Bank Account Information"
                            disabled={loading}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                            value={formik.values?.bankAccountInfo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched?.bankAccountInfo &&
                              Boolean(formik.errors?.bankAccountInfo)
                            }
                            helperText={
                              formik.touched?.bankAccountInfo && formik.errors?.bankAccountInfo
                            }
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            type="number"
                            name="taxInfo"
                            label="Tax Information"
                            disabled={loading}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                            value={formik.values?.taxInfo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched?.taxInfo && Boolean(formik.errors?.taxInfo)}
                            helperText={formik.touched?.taxInfo && formik.errors?.taxInfo}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                    <Divider sx={{ py: 0.1, opacity: 10 }} />
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

SalaryUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
SalaryUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

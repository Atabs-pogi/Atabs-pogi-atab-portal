import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import fiberImg from "assets/images/small-logos/fiber.jpg";
import costingBillService from "services/costing-bill-service";
import { useFormik } from "formik";

import CostingBillSchema, { initialCostingBill } from "../schema/costing-bill-schema";

export default function CostingBillModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialCostingBill,

    validationSchema: CostingBillSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      costingBillService
        .addBills(formik.values)
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
                  src={fiberImg}
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
                        Costing Bill Information
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0} sx={{ mt: 2, width: "80%" }}>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-basic"
                            name="vendorName"
                            label="Name"
                            disabled={loading}
                            value={formik.values.vendorName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.vendorName && Boolean(formik.errors.vendorName)}
                            helperText={formik.touched.vendorName && formik.errors.vendorName}
                            variant="outlined"
                            sx={{ pr: 7, mb: 6 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-basic"
                            name="billType"
                            label="Bill Type"
                            disabled={loading}
                            value={formik.values.billType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.billType && Boolean(formik.errors.billType)}
                            helperText={formik.touched.billType && formik.errors.billType}
                            variant="outlined"
                            sx={{ pr: 7, mb: 6 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-basic"
                            name="accountNumber"
                            label="Account Number"
                            disabled={loading}
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
                            }
                            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                            variant="outlined"
                            sx={{ pr: 7, mb: 6 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-basic"
                            name="referenceCode"
                            label="Reference Code"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.referenceCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.referenceCode && Boolean(formik.errors.referenceCode)
                            }
                            helperText={formik.touched.referenceCode && formik.errors.referenceCode}
                            sx={{ pr: 7, mb: 6 }}
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

CostingBillModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
CostingBillModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

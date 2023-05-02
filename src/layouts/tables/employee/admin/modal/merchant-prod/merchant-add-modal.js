import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import merchantImg from "assets/images/small-logos/merchant.jpg";
import merchantService from "services/merchant-prod-service";
import { useFormik } from "formik";
import EmpSchema, { initialMerchantProd } from "../schema/merchant-prod-schema";

export default function MerchantProdModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialMerchantProd,

    validationSchema: EmpSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      merchantService
        .addMerchProd(formik.values)
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
                  src={merchantImg}
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
                        Merchant Product Information
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container sx={{ width: "90%" }}>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="productCategory"
                            label="Category"
                            disabled={loading}
                            value={formik.values.productCategory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.productCategory &&
                              Boolean(formik.errors.productCategory)
                            }
                            helperText={
                              formik.touched.productCategory && formik.errors.productCategory
                            }
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="productName"
                            label="Name"
                            disabled={loading}
                            value={formik.values.productName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                            helperText={formik.touched.productName && formik.errors.productName}
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="unit"
                            label="Unit"
                            disabled={loading}
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            helperText={formik.touched.unit && formik.errors.unit}
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="unitPrice"
                            label="Unit Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.unitPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.unitPrice && Boolean(formik.errors.unitPrice)}
                            helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                            sx={{ mb: 4, width: "70%" }}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="quantity"
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            sx={{ mb: 4, width: "70%" }}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="costPrice"
                            label="Cost Price"
                            type="number"
                            disabled={loading}
                            value={formik.values.costPrice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.costPrice && Boolean(formik.errors.costPrice)}
                            helperText={formik.touched.costPrice && formik.errors.costPrice}
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="minimumStock"
                            label="Minimum Stock"
                            type="number"
                            disabled={loading}
                            value={formik.values.minimumStock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.minimumStock && Boolean(formik.errors.minimumStock)
                            }
                            helperText={formik.touched.minimumStock && formik.errors.minimumStock}
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            id="outlined-basic"
                            name="originalPrice"
                            label="Original Price"
                            type="number"
                            value={formik.values.unitPrice}
                            onBlur={formik.handleBLur}
                            error={formik.touched.unitPrice && Boolean(formik.errors.unitPrice)}
                            helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                            variant="outlined"
                            sx={{ mb: 4, width: "70%" }}
                            fullWidth
                            disabled
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

MerchantProdModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
MerchantProdModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

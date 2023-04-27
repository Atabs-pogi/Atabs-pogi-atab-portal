import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeImg from "assets/images/small-logos/employee1.jpg";
import tuxyService from "services/tuxy-service";
import { useFormik } from "formik";
import TuxSchema, { initialTuxy } from "../schema/tuxy-schema";

export default function TuxyModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialTuxy,

    validationSchema: TuxSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      tuxyService
        .addTuxy(formik?.values)
        .then(() => {
          onSuccess?.();
          formik?.setValues("price", {}, false);
          formik?.resetForm();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  // React.useEffect(() => {
  //   console.log(formik?.values);
  // }, [open]);

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
                  src={EmployeeImg}
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
                        Farmer Produced
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            name="name"
                            label="Name"
                            disabled={loading}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            variant="outlined"
                            sx={{ pr: 7, width: "33.27%", mb: 3 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                            Farmer Produced Prices
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Good Price"
                            name="goodPrice"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik?.values?.goodPrice}
                            onChange={formik.handleChange}
                            onBlur={formik?.handleBLur}
                            error={formik?.touched?.goodPrice && Boolean(formik?.errors?.goodPrice)}
                            helperText={formik?.touched?.goodPrice && formik?.errors?.goodPrice}
                            sx={{ pr: 7, width: "33.27%", mb: 3 }}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Discarded/Outer Fiber Price"
                            name="discardedPrice"
                            variant="outlined"
                            fullWidth
                            type="number"
                            disabled={loading}
                            value={formik?.values?.discardedPrice}
                            onChange={formik.handleChange}
                            onBlur={formik?.handleBLur}
                            error={
                              formik?.touched?.discardedPrice &&
                              Boolean(formik?.errors?.discardedPrice)
                            }
                            helperText={
                              formik?.touched?.discardedPrice && formik?.errors?.discardedPrice
                            }
                            sx={{ pr: 7, width: "33.27%", mb: 3 }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Reseco Price"
                            name="resecoPrice"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik?.values?.resecoPrice}
                            onChange={formik.handleChange}
                            onBlur={formik?.handleBLur}
                            error={
                              formik?.touched?.resecoPrice && Boolean(formik?.errors?.resecoPrice)
                            }
                            helperText={formik?.touched?.resecoPrice && formik?.errors?.resecoPrice}
                            sx={{ pr: 7, width: "33.27%", mb: 3 }}
                            type="number"
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

TuxyModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
TuxyModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

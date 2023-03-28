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
// import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import fiberImg from "assets/images/small-logos/fiber.jpg";
import fiberService from "services/fiber-service";
import { useFormik } from "formik";
import reportService from "services/generate-report-service";
import FibSchema, { initialFiber } from "../schema/fiber-schema";

export default function FiberModal({ open, onClose, onSuccess }) {
  const [fiber, setFiber] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: initialFiber,

    validationSchema: FibSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      fiberService
        .addFiber(formik.values)
        .then(() => {
          setFiber({});
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        });

      const FiberFields = {
        format: "pdf",
        module: "Fibers",
        filename: "FiberReceipt",
        params: {
          id: 0,
        },
      };

      const dateToday = new Date().getTime() + 8 * 60 * 60 * 1000; // add 8 hours in milliseconds
      const formattedDate = new Date(dateToday).toISOString();

      reportService
        .generateReport(FiberFields, `${formattedDate}Receipt`, "pdf")
        .then(() => {
          setLoading(false);
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
                  <MDBox sx={{ display: "flex", flexDirection: "column", height: "77vh" }}>
                    <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                      <IconButton>
                        <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                      </IconButton>
                    </MDBox>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3, mb: 5 }}>
                        Fiber Information
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Excellent Fiber"
                            variant="outlined"
                            name="excellentFiberKg"
                            type="number"
                            fullWidth
                            disabled={loading}
                            value={formik.values.excellentFiberKg}
                            defaultValue={fiber?.excellentFiberKg}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.excellentFiberKg &&
                              Boolean(formik.errors.excellentFiberKg)
                            }
                            helperText={
                              formik.touched.excellentFiberKg && formik.errors.excellentFiberKg
                            }
                            sx={{ mb: 4, width: "25%" }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Typography component="span" sx={{ fontSize: "15px" }}>
                                    kg
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Good Fiber"
                            variant="outlined"
                            name="goodFiberKg"
                            type="number"
                            fullWidth
                            disabled={loading}
                            value={formik.values.goodFiberKg}
                            defaultValue={fiber?.goodFiberKg}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.goodFiberKg && Boolean(formik.errors.goodFiberKg)}
                            helperText={formik.touched.goodFiberKg && formik.errors.goodFiberKg}
                            sx={{ mb: 4, width: "25%" }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Typography component="span" sx={{ fontSize: "15px" }}>
                                    kg
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            label="Reseco Fiber"
                            variant="outlined"
                            name="resecoFiberKg"
                            type="number"
                            fullWidth
                            disabled={loading}
                            value={formik.values.resecoFiberKg}
                            defaultValue={fiber?.resecoFiberKg}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.resecoFiberKg && Boolean(formik.errors.resecoFiberKg)
                            }
                            helperText={formik.touched.resecoFiberKg && formik.errors.resecoFiberKg}
                            sx={{ mb: 4, width: "25%" }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Typography component="span" sx={{ fontSize: "15px" }}>
                                    kg
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    {error}
                    {open && (
                      <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                        <MDButton
                          variant="contained"
                          color="success"
                          sx={{ mr: 2, mt: 5, width: 80 }}
                          type="submit"
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

FiberModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
FiberModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

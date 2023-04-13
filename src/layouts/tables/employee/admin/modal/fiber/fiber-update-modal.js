/* eslint-disable no-unused-vars */
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
import fiberImg from "assets/images/small-logos/fiber.jpg";
import fiberService from "services/fiber-service";
import { useFormik } from "formik";
import reportService from "services/generate-report-service";
import FibSchema from "../schema/fiber-amount-schema";

export default function FiberUpdateModal({ selected, open, onClose, onSuccess }) {
  const [excellentInputAmount, setExcellentInputAmount] = React.useState("");
  const [resecoInputAmount, setResecoInputAmount] = React.useState("");
  const [goodInputAmount, setGoodInputAmount] = React.useState("");
  const [fiberTotalAmount, setFiberTotalAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    onClose?.();
  };

  const { id: fiberId, ...fiber } = selected || {};

  const formik = useFormik({
    initialValues: fiber,

    validationSchema: FibSchema,
    onSubmit: () => {
      const newFiber = {
        referenceCode: formik.values.referenceCode,
        excellentFiberAmount: formik.values.excellentFiberAmount,
        goodFiberAmount: formik.values.goodFiberAmount,
        resecoFiberAmount: formik.values.resecoFiberAmount,
        excellentOrCode: formik.values.excellentOrCode,
        goodOrCode: formik.values.goodOrCode,
        resecoOrCode: formik.values.resecoOrCode,
        fiberTotalAmount,
      };

      setError("");
      setLoading(true);
      fiberService
        .updateFiber(newFiber)
        .then(() => {
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });

      const FiberFields = {
        format: "pdf",
        module: "Fibers",
        filename: "FiberReceiptUpdate",
        params: {
          id: formik.values.fiberId,
        },
      };

      const dateToday = new Date().getTime() + 8 * 60 * 60 * 1000; // add 8 hours in milliseconds
      const formattedDate = new Date(dateToday).toISOString();

      reportService
        .generateReport(FiberFields, `${formattedDate}ReceiptUpdate`, "pdf")
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

  function calculateFiberTotalAmount(values) {
    const totalAmount =
      (values.excellentFiberAmount || 0) +
      (values.goodFiberAmount || 0) +
      (values.resecoFiberAmount || 0);
    setFiberTotalAmount(totalAmount);
  }

  const handleExcellentInputAmount = (evt) => {
    setExcellentInputAmount(evt.target.value);
    const value = formik.values.excellentFiberKg * evt.target.value;
    formik.values.excellentFiberAmount = value;
    calculateFiberTotalAmount(formik.values);
  };

  const handleGoodInputAmount = (evt) => {
    setGoodInputAmount(evt.target.value);
    const value = formik.values.goodFiberKg * evt.target.value;
    formik.values.goodFiberAmount = value;
    calculateFiberTotalAmount(formik.values);
  };

  const handleResecoInputAmount = (evt) => {
    setResecoInputAmount(evt.target.value);
    const value = formik.values.resecoFiberKg * evt.target.value;
    formik.values.resecoFiberAmount = value;
    calculateFiberTotalAmount(formik.values);
  };

  React.useEffect(() => {
    calculateFiberTotalAmount(formik.values);
  }, [formik.values]);

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
                        Fiber Information ({formik.values.referenceCode})
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0} sx={{ mt: 4 }}>
                        <Grid item xs={2} mb={4} sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                            Excellent Fiber
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} mb={4}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            disabled
                            value={formik.values.excellentFiberKg}
                            sx={{ width: "80%" }}
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
                        <Grid item xs={2.5} mb={4}>
                          <TextField
                            label="Price"
                            name="excellentInputAmount"
                            variant="outlined"
                            type="number"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={excellentInputAmount}
                            onChange={handleExcellentInputAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="Excellent Fiber Amount"
                            name="excellentFiberAmount"
                            variant="outlined"
                            type="number"
                            sx={{ width: "80%" }}
                            disabled
                            value={formik.values.excellentFiberAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="OR Code"
                            name="excellentOrCode"
                            variant="outlined"
                            type="number"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={formik.values.excellentOrCode}
                            onChange={(evt) =>
                              formik.setFieldValue("excellentOrCode", evt.target.value)
                            }
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.excellentOrCode &&
                              Boolean(formik.errors.excellentOrCode)
                            }
                            helperText={
                              formik.touched.excellentOrCode && formik.errors.excellentOrCode
                            }
                          />
                        </Grid>
                        <Grid item xs={2} mb={4} sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                            Good Fiber
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} mb={4}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            sx={{ width: "80%" }}
                            disabled
                            value={formik.values.goodFiberKg}
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
                        <Grid item xs={2.5} mb={4}>
                          <TextField
                            label="Price"
                            name="goodInputAmount"
                            variant="outlined"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={goodInputAmount}
                            onChange={handleGoodInputAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="Good Fiber Amount"
                            name="goodFiberAmount"
                            variant="outlined"
                            sx={{ width: "80%" }}
                            disabled
                            value={formik.values.goodFiberAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="OR Code"
                            name="goodOrCode"
                            variant="outlined"
                            type="number"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={formik.values.goodOrCode}
                            onChange={(evt) => formik.setFieldValue("goodOrCode", evt.target.value)}
                            onBlur={formik.handleBLur}
                            error={formik.touched.goodOrCode && Boolean(formik.errors.goodOrCode)}
                            helperText={formik.touched.goodOrCode && formik.errors.goodOrCode}
                          />
                        </Grid>
                        <Grid item xs={2} mb={4} sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                            Reseco Fiber
                          </Typography>
                        </Grid>
                        <Grid item xs={1.5} mb={4}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            sx={{ width: "80%" }}
                            disabled
                            value={formik.values.resecoFiberKg}
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
                        <Grid item xs={2.5} mb={4}>
                          <TextField
                            label="Price"
                            name="resecoInputAmount"
                            variant="outlined"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={resecoInputAmount}
                            onChange={handleResecoInputAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="Reseco Fiber Amount"
                            name="resecoFiberAmount"
                            variant="outlined"
                            sx={{ width: "80%" }}
                            disabled
                            value={formik.values.resecoFiberAmount}
                          />
                        </Grid>
                        <Grid item xs={3} mb={4}>
                          <TextField
                            label="OR Code"
                            name="resecoOrCode"
                            variant="outlined"
                            type="number"
                            sx={{ width: "80%" }}
                            disabled={loading}
                            value={formik.values.resecoOrCode}
                            onChange={(evt) =>
                              formik.setFieldValue("resecoOrCode", evt.target.value)
                            }
                            onBlur={formik.handleBLur}
                            error={
                              formik.touched.resecoOrCode && Boolean(formik.errors.resecoOrCode)
                            }
                            helperText={formik.touched.resecoOrCode && formik.errors.resecoOrCode}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          mt={8}
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                              width: "40vw",
                              mr: 8,
                            }}
                          >
                            <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                              Fiber Total Amount
                            </Typography>
                            <TextField
                              variant="outlined"
                              fullWidth
                              sx={{ width: "15vw" }}
                              disabled
                              value={fiberTotalAmount}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </MDBox>
                    <Divider sx={{ py: 0.1, opacity: 10 }} />
                    {/* ERROR MESSAGE */}
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

FiberUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
FiberUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

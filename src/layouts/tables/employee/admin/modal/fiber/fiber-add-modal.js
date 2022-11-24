import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import fiberImg from "assets/images/small-logos/fiber.jpg";
import fiberService from "services/fiber-service";
import { useFormik } from "formik";
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
                  <MDBox sx={{ display: "flex", flexDirection: "column" }}>
                    <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                      <IconButton>
                        <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                      </IconButton>
                    </MDBox>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                        Fiber Information
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            name="name"
                            fullWidth
                            disabled={loading}
                            value={formik.values.name}
                            defaultValue={fiber?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Grade"
                            name="grade"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.grade}
                            defaultValue={fiber?.grade}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.grade && Boolean(formik.errors.grade)}
                            helperText={formik.touched.grade && formik.errors.grade}
                            sx={{ pr: 7 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Price"
                            name="price"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.price}
                            defaultValue={fiber?.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            type="number"
                            sx={{ pr: 7 }}
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

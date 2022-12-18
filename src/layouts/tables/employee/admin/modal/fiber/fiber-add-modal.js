import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
// import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import fiberImg from "assets/images/small-logos/fiber.jpg";
import fiberService from "services/fiber-service";
import { useFormik } from "formik";
import FibSchema, { initialFiber } from "../schema/fiber-schema";
import SelectGrade from "../../textfields/select-grade";
import SelectStrip from "../../textfields/select-strip";

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
                  <MDBox sx={{ display: "flex", flexDirection: "column", height: "77vh" }}>
                    <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                      <IconButton>
                        <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                      </IconButton>
                    </MDBox>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3, mb: 5 }}>
                        Fiber Name
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
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
                            sx={{ mb: 4, width: "27.8%" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                            Fiber Information
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <SelectGrade
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
                            sx={{ pr: 7, py: 1.5 }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <SelectStrip
                            id="outlined-basic"
                            label="Stripping Cleaning"
                            variant="outlined"
                            name="stripping"
                            fullWidth
                            disabled={loading}
                            value={formik.values.stripping}
                            defaultValue={fiber?.stripping}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.stripping && Boolean(formik.errors.stripping)}
                            helperText={formik.touched.stripping && formik.errors.stripping}
                            sx={{ pr: 7, py: 1.5 }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="outlined-basic"
                            label="Knife Used"
                            name="knifeUsed"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.knifeUsed}
                            defaultValue={fiber?.knifeUsed}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.knifeUsed && Boolean(formik.errors.knifeUsed)}
                            helperText={formik.touched.knifeUsed && formik.errors.knifeUsed}
                            type="number"
                            sx={{ pr: 2 }}
                          />
                        </Grid>
                        <Grid item xs={2}>
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
                            sx={{ pr: 3 }}
                          />
                        </Grid>
                        {/* <Grid item xs={1}>
                          <IconButton>
                            <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
                          </IconButton>
                        </Grid> */}
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

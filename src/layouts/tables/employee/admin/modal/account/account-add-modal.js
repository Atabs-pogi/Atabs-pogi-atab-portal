import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import accountImg from "assets/images/small-logos/account.jpg";
import accountService from "services/account-service";
import { useFormik } from "formik";
import AccSchema, { initialAccount } from "../schema/account-schema";
import SelectRole from "../../textfields/select-role";

export default function AccountModal({ selected, open, onClose, onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClose = () => {
    onClose?.();
  };

  const { id: empId } = selected || {};

  const formik = useFormik({
    initialValues: initialAccount,

    validationSchema: AccSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      accountService
        .addAccount(formik.values)
        .then(() => {
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

  console.log(formik.values);

  React.useEffect(() => {
    formik.values.empId = empId;
  }, []);

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
                        Account Information ({empId})
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <TextField
                            name="username"
                            label="Username"
                            disabled={loading}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            variant="outlined"
                            sx={{ mb: 4, width: "25%" }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            InputProps={{
                              endAdornment: (
                                <Box
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => setShowPassword(!showPassword)}
                                  onKeyPress={() => setShowPassword(!showPassword)}
                                  sx={{ margin: 0, cursor: "pointer" }}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon size={18} />
                                  ) : (
                                    <VisibilityOffIcon size={18} />
                                  )}
                                </Box>
                              ),
                            }}
                            onBlur={formik.handleBLur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ mb: 4, width: "25%" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <SelectRole
                            name="role"
                            disabled={loading}
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBLur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                            sx={{ mb: 4, py: 1.7, width: "25%" }}
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

AccountModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
AccountModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

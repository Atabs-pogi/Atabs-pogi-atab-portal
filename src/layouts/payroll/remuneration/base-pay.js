import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import accountImg from "assets/images/small-logos/account.jpg";
import "./index.css";

export default function BasePay({ open, onClose }) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <form autoComplete="off">
        <MDBox>
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
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <MDBox sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                            <Typography variant="h3" component="h2" sx={{ fontSize: 17, m: 1 }}>
                              Base Pay
                            </Typography>
                            <TextField
                              id="outlined-basic"
                              name="username"
                              label="Base Pay"
                              variant="outlined"
                              sx={{ mb: 4, width: "25%" }}
                              fullWidth
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                          <MDBox className="month" sx={{ overflow: "auto", maxHeight: "65vh" }}>
                            {Array(10).fill(
                              <MDBox sx={{ display: "flex", flexDirection: "row" }}>
                                <Typography variant="h3" component="h2" sx={{ fontSize: 17, m: 1 }}>
                                  Month Here:
                                </Typography>
                                <TextField
                                  id="outlined-basic"
                                  name="username"
                                  label="Hours"
                                  variant="outlined"
                                  sx={{ mb: 2, width: "22%" }}
                                  fullWidth
                                />
                                <TextField
                                  id="outlined-basic"
                                  name="username"
                                  label="Overtime"
                                  variant="outlined"
                                  sx={{ mb: 2, width: "22%", mx: 2 }}
                                  fullWidth
                                />
                                <TextField
                                  id="outlined-basic"
                                  name="username"
                                  label="Tardiness"
                                  variant="outlined"
                                  sx={{ mb: 2, width: "22%" }}
                                  fullWidth
                                />
                              </MDBox>
                            )}
                          </MDBox>
                        </Grid>
                        <Grid item xs={6}>
                          <MDBox sx={{ mx: 5 }}>
                            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                              <TableBody>
                                <TableRow
                                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                  <TableCell>
                                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                                      SSS :
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                                      Value Here
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                                <TableRow
                                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                  <TableCell>
                                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                                      PhilHealth :
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                                      Value Here
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                    <Divider sx={{ py: 0.1, opacity: 10 }} />
                    {open && (
                      <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                        <MDButton
                          type="submit"
                          variant="contained"
                          color="info"
                          sx={{ mr: 2, width: 80 }}
                        >
                          Approve
                        </MDButton>
                        <MDButton
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 2, width: 80 }}
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
        </MDBox>
      </form>
    </Modal>
  );
}

BasePay.defaultProps = {
  open: false,
  onClose: () => {},
};
// Typechecking props of the MDAlert
BasePay.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

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

export default function FiberUpdateModal({ selected, open, onClose, onSuccess }) {
  const [fiber, setFiber] = React.useState({ ...selected });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newFiber = {
      referenceCode: fiber.referenceCode,
      excellentFiberAmount: fiber.excellentFiberAmount,
      goodFiberAmount: fiber.goodFiberAmount,
      resecoFiberAmount: fiber.resecoFiberAmount,
    };

    fiberService
      .updateFiber(newFiber)
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
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
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
                      Fiber Information ({fiber?.fiberId})
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} sx={{ mt: 4, ml: 4, width: "60%" }}>
                      <Grid item xs={4} mb={4}>
                        <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                          Excellent Fiber
                        </Typography>
                      </Grid>
                      <Grid item xs={4} mb={4}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          sx={{ width: "40%" }}
                          disabled
                          value={fiber?.excellentFiberKg}
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
                      <Grid item xs={4} mb={4}>
                        <TextField
                          label="Excellent Fiber Amount"
                          name="excellentFiberAmount"
                          variant="outlined"
                          type="number"
                          fullWidth
                          disabled={loading}
                          defaultValue={fiber?.excellentFiberAmount}
                          onChange={(evt) =>
                            setFiber({ ...fiber, excellentFiberAmount: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={4} mb={4}>
                        <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                          Good Fiber
                        </Typography>
                      </Grid>
                      <Grid item xs={4} mb={4}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          sx={{ width: "40%" }}
                          disabled
                          value={fiber?.goodFiberKg}
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
                      <Grid item xs={4} mb={4}>
                        <TextField
                          label="Good Fiber Amount"
                          name="goodFiberAmount"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={fiber?.goodFiberAmount}
                          onChange={(evt) =>
                            setFiber({ ...fiber, goodFiberAmount: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={4} mb={4}>
                        <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                          Reseco Fiber
                        </Typography>
                      </Grid>
                      <Grid item xs={4} mb={4}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          sx={{ width: "40%" }}
                          disabled
                          value={fiber?.resecoFiberKg}
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
                      <Grid item xs={4} mb={4}>
                        <TextField
                          label="Reseco Fiber Amount"
                          name="resecoFiberAmount"
                          variant="outlined"
                          fullWidth
                          disabled={loading}
                          defaultValue={fiber?.resecoFiberAmount}
                          onChange={(evt) =>
                            setFiber({ ...fiber, resecoFiberAmount: evt.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {/* ERROR MESSAGE */}
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleSave}
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

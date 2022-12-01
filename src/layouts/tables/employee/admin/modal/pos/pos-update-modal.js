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
import posImg from "assets/images/small-logos/pos.jpg";
import posService from "../../../../../../services/pos-service";
import SelectGrade from "../../textfields/select-grade";

export default function PosUpdateModal({ selected, open, onClose, onSuccess }) {
  const [pos, setPos] = React.useState(selected);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newPos = {
      ...pos,
    };
    posService
      .updatePos(newPos)
      .then(() => {
        setPos({});
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
                src={posImg}
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
                      Pos Information ({pos?.id})
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          name="farmerId"
                          label="Farmer ID"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          disabled
                          defaultValue={pos.farmerId}
                          onChange={(evt) => setPos({ ...pos, farmerId: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          name="name"
                          label="Fiber"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          disabled
                          defaultValue={pos.name}
                          onChange={(evt) => setPos({ ...pos, name: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectGrade
                          name="grade"
                          label="Grade"
                          fullWidth
                          sx={{ pr: 7 }}
                          disabled
                          defaultValue={pos.grade}
                          onChange={(evt) => setPos({ ...pos, grade: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          name="kilogram"
                          label="Weight(kg)"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={pos.kilogram}
                          onChange={(evt) => setPos({ ...pos, kilogram: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          type="number"
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={pos.mobileNumber}
                          onChange={(evt) => setPos({ ...pos, mobileNumber: evt.target.value })}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography
                                  variant="h2"
                                  component="span"
                                  sx={{ fontSize: "15px", fontWeight: "400" }}
                                >
                                  +63
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Pos Address
                    </Typography>
                  </MDBox>
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

PosUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
PosUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  onSuccess: PropTypes.func,
};

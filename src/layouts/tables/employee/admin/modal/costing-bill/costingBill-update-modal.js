import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import fiberImg from "assets/images/small-logos/fiber.jpg";
import costingBillService from "services/costing-bill-service";

export default function CostingBillUpdateModal({ selected, open, onClose, onSuccess }) {
  const [costingBill, setCostingBill] = React.useState({ ...selected });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newCostingBill = {
      ...costingBill,
    };
    costingBillService
      .updateBills(newCostingBill)
      .then(() => {
        setCostingBill({});
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
                      Costing Bill Information ({costingBill?.id})
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          name="name"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "25%" }}
                          disabled={loading}
                          defaultValue={costingBill?.name}
                          onChange={(evt) =>
                            setCostingBill({ ...costingBill, name: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Type"
                          name="type"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "25%" }}
                          disabled={loading}
                          defaultValue={costingBill?.type}
                          onChange={(evt) =>
                            setCostingBill({ ...costingBill, type: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          label="Account No."
                          name="accountNo"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "25%" }}
                          disabled={loading}
                          defaultValue={costingBill?.accountNo}
                          onChange={(evt) =>
                            setCostingBill({ ...costingBill, accountNo: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          name="amount"
                          label="Amount"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "25%" }}
                          disabled={loading}
                          defaultValue={costingBill?.amount}
                          onChange={(evt) =>
                            setCostingBill({ ...costingBill, amount: evt.target.value })
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

CostingBillUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
CostingBillUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

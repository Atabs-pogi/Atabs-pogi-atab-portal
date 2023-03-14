import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import accountImg from "assets/images/small-logos/account.jpg";
import employeeService from "services/employee-service";
import TextFieldDatePicker from "../../textfields/date-picker";

export default function SalaryModal({ selected, open, onClose, onSuccess }) {
  const [effectDate, setEffectDate] = React.useState({});
  const [expireDate, setExpireDate] = React.useState({});
  const [daily, setDailyBasic] = React.useState("");
  const [monthly, setMonthlyBasic] = React.useState("");
  const [bankAcctInfo, setBankAcctInfo] = React.useState("");
  const [taxInformation, seTaxInfo] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    onClose?.();
  };

  const { id: empId } = selected || {};

  const handleSave = () => {
    setError("");
    setLoading(false);
    const params = {
      effDate: effectDate,
      expDate: expireDate,
      dailyBasic: daily,
      monthlyBasic: monthly,
      bankAccountInfo: bankAcctInfo,
      taxInfo: taxInformation,
      employeeId: empId,
    };

    employeeService
      .addSalary(params)
      .then(() => {
        onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
        alert("Salary for employee not configured successfully");
      })
      .finally(() => {
        setLoading(false);
        alert("Salary for employee configured successfully");
      });
  };

  const handleEffDate = (evt) => {
    setEffectDate(evt.toJSON());
  };

  const handleExpDate = (evt) => {
    setExpireDate(evt.toJSON());
  };

  console.log(effectDate);
  console.log(expireDate);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <form autoComplete="off">
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
                        Salary Information ({empId})
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      <Grid container sx={{ width: "90%" }}>
                        <Grid item xs={6} mt={2}>
                          <Grid sx={{ mb: 4, width: "60%" }}>
                            <TextFieldDatePicker
                              label="Effective Date"
                              disabled={loading}
                              value={effectDate}
                              onChange={handleEffDate}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <Grid sx={{ mb: 4, width: "60%" }}>
                            <TextFieldDatePicker
                              label="Expiry Date"
                              disabled={loading}
                              value={expireDate}
                              onChange={handleExpDate}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            name="daily"
                            label="Daily Basic"
                            type="number"
                            disabled={loading}
                            value={daily}
                            onChange={(evt) => setDailyBasic(evt.target.value)}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            name="monthly"
                            label="Monthly Basic"
                            type="number"
                            disabled={loading}
                            value={monthly}
                            onChange={(evt) => setMonthlyBasic(evt.target.value)}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            name="bankAcctInfo"
                            label="Bank Account Information"
                            type="number"
                            disabled={loading}
                            value={bankAcctInfo}
                            onChange={(evt) => setBankAcctInfo(evt.target.value)}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                          />
                        </Grid>
                        <Grid item xs={6} mt={2}>
                          <TextField
                            name="taxInformation"
                            label="Tax Information"
                            type="number"
                            disabled={loading}
                            value={taxInformation}
                            onChange={(evt) => seTaxInfo(evt.target.value)}
                            variant="outlined"
                            sx={{ mb: 4, width: "60%" }}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                    <Divider sx={{ py: 0.1, opacity: 10 }} />
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
        </form>
      </MDBox>
    </Modal>
  );
}

SalaryModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
SalaryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

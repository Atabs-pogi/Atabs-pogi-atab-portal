/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import {
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import tuxyImg from "assets/images/small-logos/account.jpg";
import "./index.css";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Modal from "components/Modal";
import payrollService from "services/payroll-service";
import SummaryModal from "./summary";

export default function RemunerationModal({ open, onClose }) {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [transaction, setTransaction] = React.useState(null);

  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    payrollService
      .submit({})
      .then((t) => {
        onClose();
        setTransaction(t);
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseSummary = () => {
    setTransaction(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleSave}
      title=""
      picture={tuxyImg}
      noCancel
      saveText="Save"
    >
      <SummaryModal open={!!transaction} onClose={handleCloseSummary} />
      <form autoComplete="off">
        <TabContext value={value}>
          <MDBox sx={{ width: 300 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Compute" value="1" />
              <Tab label="Taxes" value="2" />
            </TabList>
          </MDBox>
          <TabPanel value="1" className="tab">
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
              <Grid item xs={12}>
                <MDBox className="month" sx={{ overflow: "auto", maxHeight: "50vh", pt: 1 }}>
                  {Array(10).fill(
                    <MDBox sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17, m: 1 }}>
                        Date:
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        name="username"
                        label="Hours"
                        variant="outlined"
                        disabled={loading}
                        sx={{ mb: 2 }}
                        fullWidth
                      />
                      <TextField
                        id="outlined-basic"
                        name="username"
                        label="Overtime"
                        variant="outlined"
                        disabled={loading}
                        sx={{ mb: 2, mx: 2 }}
                        fullWidth
                      />
                      <TextField
                        id="outlined-basic"
                        name="username"
                        label="Tardiness"
                        variant="outlined"
                        disabled={loading}
                        sx={{ mb: 2 }}
                        fullWidth
                      />
                      <TextField
                        id="outlined-basic"
                        name="username"
                        label="Vacation"
                        variant="outlined"
                        disabled={loading}
                        sx={{ mb: 2, mx: 2 }}
                        fullWidth
                      />
                      <TextField
                        id="outlined-basic"
                        name="username"
                        label="Sick"
                        variant="outlined"
                        disabled={loading}
                        sx={{ mb: 2, mr: 2 }}
                        fullWidth
                      />
                    </MDBox>
                  )}
                </MDBox>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid item xs={12}>
              <MDBox sx={{ mx: 5 }}>
                <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>
                        <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                          HDMF :
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
          </TabPanel>
        </TabContext>
      </form>
      {error}
    </Modal>
  );
}

RemunerationModal.defaultProps = {
  open: false,
  onClose: () => {},
};

RemunerationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

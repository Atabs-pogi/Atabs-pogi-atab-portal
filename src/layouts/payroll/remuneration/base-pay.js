/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { Grid, Tab, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import tuxyImg from "assets/images/small-logos/account.jpg";
import "./index.css";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Modal from "components/Modal";
import payrollService from "services/payroll-service";
import SummaryModal from "./summary";
import Payday from "./payday";
import Deduction from "./deduction";
import Incentive from "./incentive";

export default function RemunerationModal({ open, onClose, selected, period }) {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [transaction, setTransaction] = React.useState(null);
  const [days, setDays] = React.useState([]);
  const [salary, setSalary] = React.useState(0);
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [deductions, setDeductions] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      const now = new Date(period);
      const st = now.getDate() > 15 ? 16 : 1;
      const ed =
        now.getDate() < 16 ? 15 : new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dts = [];
      // eslint-disable-next-line no-plusplus
      for (let i = st; i <= ed; i++) {
        const date = new Date(period);
        date.setDate(i);
        dts.push({
          date,
          regular: 0,
          ot: 0,
          tardiness: 0,
          vacation: 0,
          sick: 0,
        });
      }
      const st1 = new Date(period);
      st1.setDate(st);
      const ed1 = new Date(period);
      ed1.setDate(ed);
      setDays(dts);
      setStart(st1);
      setEnd(ed1);
      setSalary(0);
      setDeductions([
        {
          description: "SSS",
          value: 0,
        },
        {
          description: "PhilHealth",
          value: 0,
        },
        {
          description: "HDMF",
          value: 0,
        },
      ]);
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const params = {
      baseSalary: salary,
      periodStart: start.toJSON(),
      periodEnd: end.toJSON(),
      employeeId: selected?.id,
      items: days.map((day) => ({ ...day, date: day.date.toJSON() })),
      deductibles: deductions,
    };
    payrollService
      .submit(params)
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

  const handleChangeSalary = (evt) => {
    setSalary(parseFloat(evt.target.value) || 0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseSummary = () => {
    setTransaction(null);
  };

  const handlePayChange = (index) => (day) => {
    const dts = [...days];
    dts[index] = day;
    setDays(dts);
  };

  const handleDeductionChange = (index) => (evt) => {
    const dds = [...deductions];
    dds[index].value = parseFloat(evt.target.value) || 0;
    setDeductions(dds);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleSave}
      title=""
      disabled={salary === 0}
      picture={tuxyImg}
      noCancel
      saveText="Save"
    >
      <SummaryModal open={!!transaction} onClose={handleCloseSummary} pay={transaction} />
      <form autoComplete="off">
        <TabContext value={value}>
          <MDBox sx={{ width: 400 }}>
            {open && (
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Compute" value="1" />
                <Tab label="Deductions" value="2" />
                <Tab label="Benefits" value="3" />
                <Tab label="Incentives" value="4" />
              </TabList>
            )}
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
                    name="basepay"
                    label="Base Pay"
                    variant="outlined"
                    value={salary}
                    onChange={handleChangeSalary}
                    sx={{ mb: 4, width: "25%" }}
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox className="month" sx={{ overflow: "auto", maxHeight: "50vh", pt: 1 }}>
                  {days.map?.((day, index) => (
                    <Payday
                      {...day}
                      key={day.date}
                      loading={loading}
                      onChange={handlePayChange(index)}
                    />
                  ))}
                </MDBox>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            {deductions.map?.((d, index) => (
              <Deduction
                key={d.description}
                label={d.description}
                value={d.value}
                onChange={handleDeductionChange(index)}
                loading={loading}
              />
            ))}
          </TabPanel>
          <TabPanel value="3">
            {deductions.map?.((d, index) => (
              <Deduction
                key={d.description}
                label={d.description}
                value={d.value}
                onChange={handleDeductionChange(index)}
                loading={loading}
              />
            ))}
          </TabPanel>
          <TabPanel value="4">
            <Incentive label="Description" />
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
  selected: null,
  period: new Date(),
};

RemunerationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  period: PropTypes.instanceOf(Date),
};

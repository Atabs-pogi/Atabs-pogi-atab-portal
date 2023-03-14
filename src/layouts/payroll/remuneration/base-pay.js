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
import Payday from "./payday";
import Deductions from "./deduction";
import Benefits from "./benefits";
import SelectPayMethod from "../../tables/employee/admin/textfields/select-paymethod";

export default function RemunerationModal({ open, onClose, selected, period, onSuccess }) {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [transaction, setTransaction] = React.useState(null);
  const [days, setDays] = React.useState([]);
  const [payMethod, setMethod] = React.useState("");
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [benefits, setBenefits] = React.useState([]);
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
      setBenefits([
        {
          benefitType: "SSS",
          contributionAmount: 0,
        },
        {
          benefitType: "PhilHealth",
          contributionAmount: 0,
        },
        {
          benefitType: "HDMF",
          contributionAmount: 0,
        },
      ]);
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(false);
    const params = {
      periodStart: start.toJSON(),
      periodEnd: end.toJSON(),
      paymentDate: start.toJSON(),
      paymentMethod: payMethod,
      employeeId: selected?.id,
      items: days.map((day) => ({ ...day, date: day.date.toJSON() })),
      benefits,
      deductibles: deductions,
    };

    if (payMethod !== "") {
      payrollService
        .submit(params)
        .then((t) => {
          onClose();
          setTransaction(t);
          setDeductions([]);
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Payment Method not specified");
    }
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

  const handleBenefitsChange = (index) => (evt) => {
    const bfs = [...benefits];
    bfs[index].contributionAmount = parseFloat(evt.target.value) || 0;
    setBenefits(bfs);
  };

  const handleDeductionsChange = (newDeductions) => {
    setDeductions(newDeductions);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleSave}
      title=""
      disabled={false}
      picture={tuxyImg}
      noCancel
      saveText="Save"
    >
      <form autoComplete="off">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3" component="h2" sx={{ fontSize: 18 }}>
              Payslip ({selected?.id})
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <SelectPayMethod
              variant="outlined"
              value={payMethod}
              onChange={(evt) => setMethod(evt.target.value)}
              sx={{ fontSize: 18, my: 3 }}
            />
          </Grid>
        </Grid>
        <TabContext value={value}>
          <MDBox sx={{ width: 400 }}>
            {open && (
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Compute" value="1" />
                <Tab label="Benefits" value="2" />
                <Tab label="Deductions" value="3" />
              </TabList>
            )}
          </MDBox>
          <TabPanel value="1" className="tab">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <MDBox className="month" sx={{ overflow: "auto", maxHeight: "50vh", pt: 2 }}>
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
            {benefits.map?.((b, index) => (
              <Benefits
                key={b.benefitType}
                label={b.benefitType}
                value={b.contributionAmount}
                onChange={handleBenefitsChange(index)}
                loading={loading}
                fullWidth
              />
            ))}
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <MDBox className="month" sx={{ overflow: "auto", maxHeight: "50vh", pt: 2 }}>
                  <Deductions
                    deductions={deductions}
                    onDeductionsChange={handleDeductionsChange}
                    loading={loading}
                  />
                </MDBox>
              </Grid>
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
  selected: null,
  period: new Date(),
  onSuccess: () => {},
};

RemunerationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  period: PropTypes.instanceOf(Date),
  onSuccess: PropTypes.func,
};

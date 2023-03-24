/* eslint-disable no-alert */
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
import MDButton from "components/MDButton";
import DatePicker from "layouts/tables/employee/admin/textfields/date-picker";
import Payday from "./payday";
import Deductions from "./deduction";
import Benefits from "./benefits";
import SelectPayMethod from "../../tables/employee/admin/textfields/select-paymethod";

export default function RemunerationModal({
  open,
  onClose,
  selected,
  period,
  onFinish,
  onSuccess,
}) {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [days, setDays] = React.useState([]);
  const [payMethod, setMethod] = React.useState("");
  const [payDate, setPayDate] = React.useState(new Date());
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [grossPay, setGrossPay] = React.useState(new Date());
  const [benefits, setBenefits] = React.useState([]);
  const [deductions, setDeductions] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);

  console.log(selected);

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

      payrollService.getEmployee(selected?.row.id, selected?.start, selected?.end).then((e) => {
        console.log(e);
        setIsEmpty(e === "");
        setGrossPay(e.grossPay);
        setBenefits([
          {
            payrollId: e.id,
            benefitType: "SSS",
            contributionAmount: 0,
          },
          {
            payrollId: e.id,
            benefitType: "PhilHealth",
            contributionAmount: 0,
          },
          {
            payrollId: e.id,
            benefitType: "HDMF",
            contributionAmount: 0,
          },
        ]);
      });
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  const handleSavePayDay = () => {
    setError("");
    setLoading(true);
    const params = {
      periodStart: start.toJSON(),
      periodEnd: end.toJSON(),
      paymentDate: payDate.toJSON(),
      paymentMethod: payMethod,
      employeeId: selected?.row.id,
      items: days.map((day) => ({ ...day, date: day.date.toJSON() })),
    };
    if (payMethod !== "") {
      console.log(params);
      payrollService
        .payday(params)
        .then((e) => {
          alert("Payroll Configuration for Employee Records Successful");
          setDeductions([]);
          setValue(1);
          onSuccess();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Payment Method not specified");
      setLoading(false);
    }
  };

  const handleSaveBenefit = () => {
    setError("");
    setLoading(false);

    payrollService
      .benefit(benefits)
      .then((e) => {
        alert("Payroll Configuration for Benefits Successful");
        setDeductions([]);
        setValue(1);
        onSuccess();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSaveDeductions = () => {
    setError("");
    setLoading(false);

    payrollService
      .deduction(deductions)
      .then((e) => {
        alert("Payroll Configuration for Deductions Successful");
        setDeductions([]);
        setValue(1);
        onSuccess();
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
    payrollService.getEmployee(selected?.row.id, selected?.start, selected?.end).then((e) => {
      const updatedDeductions = newDeductions.map((deduction) => ({
        ...deduction,
        payrollId: e.id,
      }));
      setDeductions(updatedDeductions);
    });
  };

  const handleSave = () => {
    switch (value) {
      case "1":
        handleSavePayDay();
        break;
      case "2":
        handleSaveBenefit();
        break;
      case "3":
        handleSaveDeductions();
        break;
      default:
        alert("Invalid tab value");
    }
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
          <Grid item xs={6} pb={2}>
            <Typography variant="h3" component="h2" sx={{ fontSize: 18 }}>
              Payslip ({selected?.row.firstName} {selected?.row.lastName})
            </Typography>
          </Grid>
        </Grid>
        <TabContext value={value}>
          <MDBox sx={{ width: 400 }}>
            {open && (
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Records" value="1" />
                <Tab label="Benefits" value="2" disabled={isEmpty} />
                <Tab label="Deductions" value="3" disabled={isEmpty} />
              </TabList>
            )}
          </MDBox>
          <TabPanel value="1" className="tab">
            <Grid container spacing={0}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  pr: 3,
                  pb: 2,
                }}
              >
                <Typography variant="h3" component="h2" sx={{ fontSize: 17, pr: 2 }}>
                  Payment Method:
                </Typography>
                <SelectPayMethod
                  variant="outlined"
                  value={payMethod}
                  onChange={(evt) => setMethod(evt.target.value)}
                  sx={{ fontSize: 18 }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  pr: 3,
                  pb: 2,
                }}
              >
                <Typography variant="h3" component="h2" sx={{ fontSize: 17, pr: 2 }}>
                  Payment Date:
                </Typography>
                <Grid sx={{ width: "13vw" }}>
                  <DatePicker
                    label="Payment Date"
                    value={payDate}
                    onChange={(evt) => setPayDate(evt)}
                    sx={{ fontSize: 18 }}
                  />
                </Grid>
              </Grid>
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
            <Grid container spacing={0}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  pb: 4,
                  pr: 5,
                }}
              >
                <Typography variant="h3" component="h2" sx={{ fontSize: 18, pr: 4 }}>
                  Gross Pay:
                </Typography>
                <TextField value={grossPay} />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
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
  onFinish: () => {},
  onSuccess: () => {},
};

RemunerationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  period: PropTypes.instanceOf(Date),
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
};

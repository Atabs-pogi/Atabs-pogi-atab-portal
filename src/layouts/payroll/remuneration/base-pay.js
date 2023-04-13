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
import OtherDeductions from "./deductions/other-deductions";
import MandatoryDeductions from "./deductions/mandatory-deductions";
import Benefits from "./benefits";
import SelectPayMethod from "../../tables/employee/admin/textfields/select-paymethod";

export default function RemunerationModal({
  open,
  onClose,
  selected,
  periodType,
  period,
  onSuccess,
}) {
  const [value, setValue] = React.useState("1");
  const [tabValue, setTabValue] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [days, setDays] = React.useState([]);
  const [payMethod, setMethod] = React.useState("");
  const [payDate, setPayDate] = React.useState(new Date());
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const [grossPay, setGrossPay] = React.useState(new Date());
  const [benefits, setBenefits] = React.useState([]);
  const [mandatoryDeductions, setMandatoryDeductions] = React.useState([]);
  const [otherDeductions, setOtherDeductions] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [hideSave, setHideSave] = React.useState(false);

  React.useEffect(() => {
    if (open && selected) {
      const now = new Date(period);
      const dts = [];

      if (periodType === "weekly") {
        const weekStart = new Date(period);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(period);
        weekEnd.setDate(weekEnd.getDate());
        // eslint-disable-next-line no-plusplus
        for (let i = weekStart.getDay(); i <= weekEnd.getDay(); i++) {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + i);
          dts.push({
            date,
            regular: 0,
            ot: 0,
            tardiness: 0,
            vacation: 0,
            sick: 0,
          });
        }
        setDays(dts);
        setStart(weekStart);
        setEnd(weekEnd);
      } else if (periodType === "semi-monthly") {
        console.log(periodType);
        const st = now.getDate() > 15 ? 16 : 1;
        const ed =
          now.getDate() < 16 ? 15 : new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
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
      } else if (periodType === "monthly") {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= monthEnd.getDate(); i++) {
          const date = new Date(monthStart);
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
        st1.setDate(monthStart.getDate());
        const ed1 = new Date(period);
        ed1.setDate(monthEnd.getDate());
        setDays(dts);
        setStart(st1);
        setEnd(ed1);
      }

      setDays(dts);
    }
  }, [open, selected, period]);

  React.useEffect(() => {
    payrollService.getEmployee(selected?.row.id, selected?.start, selected?.end).then((e) => {
      setIsEmpty(e === "");
      setGrossPay(e.grossPay);
    });

    if (value === "1") {
      setHideSave(true);
    } else if (value === "2") {
      setHideSave(false);
    } else if (value === "3") {
      setHideSave(false);
    } else {
      setHideSave(true);
    }
  }, [value]);

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
      benefits,
    };
    if (payMethod !== "") {
      payrollService
        .payday(params)
        .then((e) => {
          alert("Payroll Configuration for Employee Records Successful");
          setMandatoryDeductions([]);
          setOtherDeductions([]);
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
      console.log(params);
      alert("Payment Method not specified");
      setLoading(false);
    }
  };

  const handleSaveDeductions = () => {
    setError("");
    setLoading(false);

    payrollService.getEmployee(selected?.row.id, selected?.start, selected?.end).then((e) => {
      const params = {
        payrollId: e.id,
        mandatoryDeductions,
        otherDeductions,
      };

      payrollService
        .deduction(params)
        .then(() => {
          alert("Payroll Configuration for Deductions Successful");
          setMandatoryDeductions([]);
          setOtherDeductions([]);
          setValue(1);
          onSuccess();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePayChange = (index) => (day) => {
    const dts = [...days];
    dts[index] = day;
    setDays(dts);
  };

  const handleBenefitsChange = (newBenefits) => {
    setBenefits(newBenefits);
  };

  const handleMandatoryDeductionsChange = (newDeductions) => {
    setMandatoryDeductions(newDeductions);
  };

  const handleOtherDeductionsChange = (newDeductions) => {
    setOtherDeductions(newDeductions);
  };

  const handleSave = () => {
    switch (value) {
      case "2":
        handleSavePayDay();
        break;
      case "3":
        handleSaveDeductions();
        break;
      default:
        alert("Invalid tab value");
    }
  };

  console.log(mandatoryDeductions);
  console.log(otherDeductions);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSave={handleSave}
      title=""
      disabled={false}
      picture={tuxyImg}
      noSuccess={hideSave}
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
                <Tab label="Benefits" value="2" />
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
              <Grid item xs={12}>
                <MDBox className="month" sx={{ overflow: "auto", maxHeight: "50vh", pt: 2 }}>
                  <Benefits
                    benefits={benefits}
                    onBenefitsChange={handleBenefitsChange}
                    loading={loading}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <TabContext value={tabValue}>
              <MDBox sx={{ width: 400 }}>
                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                  <Tab label="Mandatory Deductions" value="1" />
                  <Tab label="Other Deductions" value="2" />
                </TabList>
              </MDBox>
              <MDBox
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  pr: 5,
                }}
              >
                <Typography variant="h3" component="h2" sx={{ fontSize: 18, pr: 4 }}>
                  Gross Pay:
                </Typography>
                <TextField value={grossPay} />
              </MDBox>
              <TabPanel value="1">
                <MDBox
                  className="month"
                  sx={{
                    overflow: "auto",
                    maxHeight: "40vh",
                  }}
                >
                  <MandatoryDeductions
                    deductions={mandatoryDeductions}
                    onDeductionsChange={handleMandatoryDeductionsChange}
                    loading={loading}
                  />
                </MDBox>
              </TabPanel>
              <TabPanel value="2">
                <MDBox
                  className="month"
                  sx={{
                    overflow: "auto",
                    maxHeight: "40vh",
                  }}
                >
                  <OtherDeductions
                    deductions={otherDeductions}
                    onDeductionsChange={handleOtherDeductionsChange}
                    loading={loading}
                  />
                </MDBox>
              </TabPanel>
            </TabContext>
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
  periodType: "",
  onSuccess: () => {},
};

RemunerationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  period: PropTypes.instanceOf(Date),
  periodType: PropTypes.string,
  onSuccess: PropTypes.func,
};

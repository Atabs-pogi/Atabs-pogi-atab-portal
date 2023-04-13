import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MDTypography from "components/MDTypography";
import payrollService from "services/payroll-service";
import empsalaryService from "services/empsalary-service";
import reportService from "services/generate-report-service";
import SelectFileType from "layouts/tables/employee/admin/textfields/select-fileType";
import SelectPeriod from "layouts/tables/employee/admin/textfields/select-period";
import Moment from "react-moment";
import SummaryModal from "./summary";
import BasePay from "./base-pay";

export default function Payroll() {
  const [employees, setEmployees] = React.useState([]);
  const [FileType, setFileType] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  const [transaction, setTransaction] = React.useState(null);
  const [period, setPeriod] = React.useState("monthly");

  const [start, end] = React.useMemo(() => {
    let st1;
    let ed1;
    if (period === "weekly") {
      const st = date.getDate() - date.getDay();
      const ed = date.getDate();
      st1 = new Date(date);
      st1.setDate(st);
      ed1 = new Date(date);
      ed1.setDate(ed);
    } else if (period === "semi-monthly") {
      const st = date.getDate() > 15 ? 16 : 1;
      const ed =
        date.getDate() < 16 ? 15 : new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      st1 = new Date(date);
      st1.setDate(st);
      ed1 = new Date(date);
      ed1.setDate(ed);
    } else if (period === "monthly") {
      const st = 1;
      const ed = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      st1 = new Date(date);
      st1.setDate(st);
      ed1 = new Date(date);
      ed1.setDate(ed);
    }
    return [st1, ed1];
  }, [date, period]);

  const SalaryExists = (params) => {
    const StartDate = start.toISOString().substr(0, 10).replace(/-/g, "/");
    const EndDate = end.toISOString().substr(0, 10).replace(/-/g, "/");

    setLoading(true);
    empsalaryService
      .getSalary()
      .then((res) => {
        const ids = res.map((salary) => salary.employee.id);
        const exists = ids.some((id) => id === params.row.id);
        if (exists) {
          setSelected({ row: params.row, start: StartDate, end: EndDate });
        } else {
          // eslint-disable-next-line no-alert
          alert("No salary configuration for this employee yet.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenSummary = (params) => {
    const StartDate = start.toISOString().substr(0, 10).replace(/-/g, "/");
    const EndDate = end.toISOString().substr(0, 10).replace(/-/g, "/");

    payrollService.getEmployee(params?.row.id, StartDate, EndDate).then((e) => {
      setTransaction(e);
    });
  };

  const handleGenerateReportForAll = () => {
    const StartDate = start.toISOString().substr(0, 10).replace(/-/g, "/");
    const EndDate = end.toISOString().substr(0, 10).replace(/-/g, "/");

    const payslipAllFromPeriod = {
      format: FileType,
      module: "Payslip",
      filename: "PayslipForReports",
      params: {
        Date_From: StartDate,
        Date_End: EndDate,
      },
    };

    if (FileType !== "") {
      setError("");
      setLoading(true);
      reportService
        .generateReport(payslipAllFromPeriod, `${StartDate}-${EndDate}PayslipsReport`, FileType)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setError(err?.message);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert("Please specify File Type.");
      console.log(payslipAllFromPeriod);
    }
  };

  const handleGenerateReport = (params) => {
    const StartDate = start.toISOString().substr(0, 10).replace(/-/g, "/");
    const EndDate = end.toISOString().substr(0, 10).replace(/-/g, "/");

    const payslipInfo = {
      format: FileType,
      module: "Payslip",
      filename: "Payslip_Info",
      params: {
        id: params.row.id,
        Date_From: StartDate,
        Date_End: EndDate,
      },
    };

    if (FileType !== "") {
      setError("");
      setLoading(true);
      reportService
        .generateReport(payslipInfo, `${StartDate}-${EndDate}SinglePayslipReport`, FileType)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setError(err?.message);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert("Please specify File Type.");
      console.log(payslipInfo);
    }
  };

  const handleCloseSummary = () => {
    setTransaction(null);
  };

  const handleSearch = () => {
    setLoading(true);
    payrollService
      .getEmployeesByPeriod(start, end, search)
      .then((e) => {
        setEmployees(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    handleSearch();
  }, [date]);

  const UpdateHandleClose = () => setSelected(null);

  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "Firstname", width: 150 },
    { field: "middleName", headerName: "Middlename", width: 150 },
    { field: "lastName", headerName: "Lastname", width: 150 },
    {
      field: "reviewed",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => (params.row.reviewed ? "Reviewed" : ""),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <MDButton variant="contained" color="success" size="small">
              Review
            </MDButton>
          }
          onClick={() => SalaryExists(params)}
          label="Update"
        />,
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => handleOpenSummary(params)}
          label="View Summary"
        />,
        <SummaryModal open={!!transaction} onClose={handleCloseSummary} pay={transaction} />,
      ],
    },
    {
      field: "payslip",
      headerName: "Payslip",
      headerAlign: "center",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <MDButton
          variant="contained"
          color="dark"
          size="small"
          onClick={() => handleGenerateReport(params)}
        >
          Generate Payslip
        </MDButton>
      ),
    },
  ]);

  const handleSearchChange = (evt) => {
    setSearch(evt.target.value);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  const handleNextPeriod = () => {
    const st = new Date(date);
    if (period === "weekly") {
      st.setDate(st.getDate() + 7);
    } else if (period === "semi-monthly") {
      if (st.getDate() > 15) {
        st.setMonth(st.getMonth() + 1);
        st.setDate(1);
      } else {
        st.setDate(16);
      }
    } else if (period === "monthly") {
      st.setMonth(st.getMonth() + 1);
      st.setDate(1);
    }
    setDate(st);
  };

  const handlePrevPeriod = () => {
    const st = new Date(date);
    if (period === "weekly") {
      st.setDate(st.getDate() - 7);
    } else if (period === "semi-monthly") {
      if (st.getDate() > 15) {
        st.setDate(1);
      } else {
        st.setMonth(st.getMonth() - 1);
        st.setDate(16);
      }
    } else if (period === "monthly") {
      st.setMonth(st.getMonth() - 1);
      st.setDate(1);
    }
    setDate(st);
  };

  return (
    <MDBox>
      <BasePay
        open={selected?.row?.id}
        periodType={period}
        period={date}
        onClose={UpdateHandleClose}
        selected={selected}
        onSuccess={() => {
          setSelected(null);
          handleSearch();
        }}
      />
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            py: 1,
            px: 2,
          }}
        >
          <SelectPeriod
            fullWidth
            name="period"
            value={period}
            onChange={(evt) => setPeriod(evt.target.value)}
            sx={{ width: "15vw", height: "2.3vw" }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            py: 1,
            px: 2,
          }}
        >
          <MDButton
            variant="contained"
            color="dark"
            size="small"
            onClick={handleGenerateReportForAll}
            sx={{ padding: 1.5, mr: 4 }}
          >
            Generate Payslips
          </MDButton>
          <SelectFileType
            fullWidth
            name="fileType"
            value={FileType}
            onChange={(evt) => setFileType(evt.target.value)}
            sx={{ width: "15vw", height: "2.3vw" }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ display: "inline-block" }} onClick={handlePrevPeriod}>
            <ChevronLeftIcon />
          </IconButton>
          <MDTypography sx={{ display: "inline-block" }}>
            <Moment format="MM/DD/YYYY">{start}</Moment>
          </MDTypography>
          -
          <MDTypography sx={{ display: "inline-block" }}>
            <Moment format="MM/DD/YYYY">{end}</Moment>
          </MDTypography>
          <IconButton sx={{ display: "inline-block" }} onClick={handleNextPeriod}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            pr: 2,
          }}
        >
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearchChange}
            value={search}
            sx={{ ml: 2 }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%", position: "relative" }}>
        <DataGrid
          getRowClassName={(params) => (params.row.reviewed ? "reviewed" : "")}
          rows={employees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[1]}
          loading={loading}
        />
      </div>
      {error}
    </MDBox>
  );
}

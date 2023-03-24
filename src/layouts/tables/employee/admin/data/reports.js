import * as React from "react";
import { Divider, Grid } from "@mui/material";

import MDBox from "components/MDBox";

import PayslipCard from "examples/Cards/GenerateReportsCard/PayslipCard";
import ReportsCard from "examples/Cards/GenerateReportsCard/ReportsCard";
import AccountsReportCard from "examples/Cards/GenerateReportsCard/AccountsReportCard";
import SelectReport from "../textfields/select-report";
import SelectFileType from "../textfields/select-fileType";

export default function GenerateReports() {
  const [selectedReport, setSelectedReport] = React.useState("");
  const [FileType, setFileType] = React.useState("");

  const EmployeeFields = {
    format: "",
    module: "Employees",
    filename: "Employees_Information",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const FarmerFields = {
    format: "",
    module: "farmer",
    filename: "FarmersInformations",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const FiberFields = {
    format: "",
    module: "Fibers",
    filename: "Fibers_Information",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const AccountFields = {
    format: "",
    module: "Accounts",
    filename: "accounts_information",
    params: {
      ID: 0,
    },
  };

  const TuxyFields = {
    format: "",
    module: "tuxy",
    filename: "Tuxy_Information",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const TuxyLogsFields = {
    format: "",
    module: "tuxy",
    filename: "Tuxy_Logs1",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const BillsFields = {
    format: "",
    module: "CostingBill",
    filename: "CostingBill",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const TransactionFields = {
    format: "",
    module: "Transactions",
    filename: "Transactions_Informations",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const MerchProdFields = {
    format: "",
    module: "MerchantProducts",
    filename: "MerchProds_information",
    params: {
      ID: 0,
      Date_From: "",
      Date_End: "",
    },
  };

  const PayrollFields = {
    format: "",
    module: "Payslip",
    filename: "Payslip_Info",
    params: {
      id: "0",
      Date_From: "",
      Date_End: "",
    },
  };

  // const PayrollsFields = {
  //   format: "",
  //   module: "Payslip",
  //   filename: "Payslip",
  //   params: {
  //     Date_From: "",
  //     Date_End: "",
  //   },
  // };

  const PayrollsFields = {
    format: "",
    module: "Payslip",
    filename: "PayslipForReports",
    params: {
      Date_From: "",
      Date_End: "",
    },
  };

  return (
    <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%", mx: 4, my: 2 }}>
      <MDBox>
        <Grid container>
          <Grid item xs={6} sx={{ p: 1 }}>
            <SelectReport
              fullWidth
              name="report"
              value={selectedReport}
              onChange={(evt) => setSelectedReport(evt.target.value)}
              sx={{ width: "15vw", height: "2.3vw" }}
            />
          </Grid>
          <Grid item xs={6} sx={{ p: 1, display: "flex", justifyContent: "end" }}>
            <SelectFileType
              fullWidth
              name="fileType"
              value={FileType}
              onChange={(evt) => setFileType(evt.target.value)}
              sx={{ width: "15vw", height: "2.3vw" }}
            />
          </Grid>
        </Grid>
      </MDBox>

      <Divider style={{ backgroundColor: "black" }} />

      <MDBox className="modal-content" sx={{ mt: 6 }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          {selectedReport === "employee" && (
            <Grid item>
              <ReportsCard
                icon="badge"
                title="Employee"
                apiFields={EmployeeFields}
                reportname="EmployeeReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "farmer" && (
            <Grid item>
              <ReportsCard
                icon="grass"
                title="Farmer"
                apiFields={FarmerFields}
                reportname="FarmerReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "fiber" && (
            <Grid item>
              <ReportsCard
                icon="storefront"
                title="Fiber"
                apiFields={FiberFields}
                reportname="FiberReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "account" && (
            <Grid item>
              <AccountsReportCard
                icon="badge"
                title="Account"
                apiFields={AccountFields}
                reportname="AccountReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "tuxy" && (
            <Grid item>
              <ReportsCard
                icon="forest"
                title="Tuxy"
                apiFields={TuxyFields}
                reportname="TuxyReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "tuxylogs" && (
            <Grid item>
              <ReportsCard
                icon="history"
                title="Price Logs"
                apiFields={TuxyLogsFields}
                reportname="PriceLogsReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "costingbill" && (
            <Grid item>
              <ReportsCard
                icon="payments"
                title="Costing BIll"
                apiFields={BillsFields}
                reportname="CostingBIllReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "transactions" && (
            <Grid item>
              <ReportsCard
                icon="paid"
                title="Transactions"
                apiFields={TransactionFields}
                reportname="TransactionReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "merchproduct" && (
            <Grid item>
              <ReportsCard
                icon="store"
                title="Merchant Product"
                apiFields={MerchProdFields}
                reportname="MerchantProductReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "payslip" && (
            <Grid item>
              <PayslipCard
                icon="store"
                title="Payslip"
                apiFields={PayrollFields}
                reportname="PayslipReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
          {selectedReport === "payslipsummary" && (
            <Grid item>
              <ReportsCard
                icon="store"
                title="Payslip Summary"
                apiFields={PayrollsFields}
                reportname="PayslipSummaryReport"
                FileType={FileType}
                percentage={{
                  color: "dark",
                }}
              />
            </Grid>
          )}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

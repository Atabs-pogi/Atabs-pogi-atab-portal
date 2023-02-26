import * as React from "react";

import MDBox from "components/MDBox";
import ReportsCard from "examples/Cards/GenerateReportsCard";
import { Grid } from "@mui/material";

export default function GenerateReports() {
  const EmployeeFields = {
    format: "",
    module: "Employees",
    filename: "EmployeesInformation",
    params: {
      ID: 0,
    },
  };

  const FarmerFields = {
    format: "",
    module: "farmer",
    filename: "FarmersInformations",
    params: {
      ID: 0,
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

  const FiberFields = {
    format: "",
    module: "Fibers",
    filename: "fiber_information",
    params: {
      ID: 0,
    },
  };

  const TuxyFields = {
    format: "",
    module: "tuxy",
    filename: "TuxyCoop",
    params: {
      ID: 0,
    },
  };

  const TuxyLogsFields = {
    format: "",
    module: "tuxy",
    filename: "TuxyLogs",
    params: {
      ID: 0,
    },
  };

  const TransactionFields = {
    format: "",
    module: "Transactions",
    filename: "transactions_information",
    params: {
      ID: 0,
    },
  };

  const MerchProdFields = {
    format: "",
    module: "MerchantProducts",
    filename: "merchant_product_information",
    params: {
      ID: 0,
    },
  };

  return (
    <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%", ml: 5, my: 5 }}>
      <MDBox className="modal-content">
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <ReportsCard
              icon="badge"
              title="Employee"
              apiFields={EmployeeFields}
              filename="EmployeeReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="grass"
              title="Farmer"
              apiFields={FarmerFields}
              filename="FarmerReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="storefront"
              title="Fiber"
              apiFields={FiberFields}
              filename="FiberReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="badge"
              title="Account"
              apiFields={AccountFields}
              filename="AccountReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <ReportsCard
              icon="forest"
              title="Tuxy"
              apiFields={TuxyFields}
              filename="TuxyReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="history"
              title="Price Logs"
              apiFields={TuxyLogsFields}
              filename="PriceLogsReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="payments"
              title="Costing BIll"
              apiFields={EmployeeFields}
              filename="CostingBIllReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="paid"
              title="Transactions"
              apiFields={TransactionFields}
              filename="TransactionReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <ReportsCard
              icon="store"
              title="Merchant Product"
              apiFields={MerchProdFields}
              filename="MerchantProductReport"
              percentage={{
                color: "dark",
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";

import { Card, Grid } from "@mui/material";

import ProductConfig from "./productConfig";
import TransactionTable from "./transactionTable";

import "./style.css";

function POS() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={1}>
        <MDBox
          sx={{
            margin: "auto",
            marginBottom: "20px",
          }}
        >
          <Grid pb={2}>
            <Card
              py={2}
              px={4}
              sx={{
                height: "34vh",
                borderRadius: "20px",
                backgroundColor: "#fff",
              }}
            >
              <ProductConfig />
            </Card>
          </Grid>
          <Grid>
            <Card
              py={2}
              px={2}
              sx={{
                borderRadius: "20px",
                backgroundColor: "#fff",
              }}
            >
              <TransactionTable />
            </Card>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default POS;

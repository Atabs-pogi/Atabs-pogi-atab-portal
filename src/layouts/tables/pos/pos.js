import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";

import { Grid } from "@mui/material";

import ProductConfig from "./productConfig";
import ProductContainer from "./data/ProductContainer";
import TransactionTable from "./transactionTable";

import "./style.css";

function POS() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          display: "flex",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <ProductContainer />

        <MDBox>
          <Grid
            py={2}
            px={2}
            sx={{
              height: "38vh",
              width: "120vh",
              borderRadius: "20px",
              backgroundColor: "#fff",
            }}
          >
            <ProductConfig />
          </Grid>
          <Grid>
            <TransactionTable />
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default POS;

import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Footer from "examples/Footer";

import Table from "./table";
import "./style.css";

function Cashier() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        px={4}
        py={4}
        className="center-scan-btn"
        sx={{
          textAlign: "center",
          backgroundColor: "#fff",
          margin: "auto",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <MDButton variant="contained" color="secondary" className="scan-btn">
          Scan Receipt
        </MDButton>
      </MDBox>
      <MDBox
        px={2}
        py={2}
        sx={{
          backgroundColor: "#fff",
          margin: "auto",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <MDBox
          px={2}
          py={2}
          sx={{
            backgroundColor: "#fff",
            margin: "auto",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <Table />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Cashier;

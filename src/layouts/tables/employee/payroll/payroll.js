/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import "./tablestyle.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import PayrollData from "./data/datapayroll";
// import { payrolltable } from "./data/payrolltable";
// import { Typography } from "@mui/material";

export default function PayrollTable() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <PayrollData />
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

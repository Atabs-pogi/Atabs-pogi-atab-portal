/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import "./tablestyle.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import AttendanceData from "./data/attendance-data";
// import { payrolltable } from "./data/payrolltable";
// import { Typography } from "@mui/material";

export default function AttendanceTable() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <AttendanceData />
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

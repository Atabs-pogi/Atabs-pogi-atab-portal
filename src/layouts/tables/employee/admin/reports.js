// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import Reports from "./data/reports";

function GenerateReports() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Reports />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GenerateReports;

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import Remunuration from "./remuneration";

function PayrollTable() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Remunuration />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PayrollTable;

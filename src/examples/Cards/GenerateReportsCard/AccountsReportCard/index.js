import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import reportService from "services/generate-report-service";

function AccountsReportCard({ color, title, apiFields, reportname, percentage, icon, FileType }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // eslint-disable-next-line no-param-reassign
  apiFields.format = FileType;

  const handleGenerateReport = () => {
    if (FileType !== "") {
      setError("");
      setLoading(true);
      reportService
        .generateReport(apiFields, reportname, FileType)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Please specify File Type");
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#eee",
        border: "solid 1px #bbb",
        width: "25vw",
        // width: "17vw",
      }}
    >
      <MDBox pt={1} px={2}>
        {loading}
        {error}
        <MDBox
          variant="gradient"
          bgColor={percentage.color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
            justifyContent: "right",
            textAlign: "right",
            float: "right",
            width: "8vw",
            mt: -4,
            // mb: "107px",
          }}
          lineHeight={1.25}
        >
          <MDTypography
            variant="button"
            fontWeight="light"
            sx={{ color: "black", fontWeight: "500" }}
            mb={2}
          >
            {title || ""}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider sx={{ height: "2px", mt: 10 }} />
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={12}
        mb={2}
        pb={2}
        px={2}
      >
        <MDButton variant="contained" onClick={handleGenerateReport} color="success" sx={{ mt: 2 }}>
          <AddIcon sx={{ mr: 1 }} />
          Generate Report
        </MDButton>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of AccountsReportCard
AccountsReportCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
  reportname: "",
  FileType: "",
};

// Typechecking props for the AccountsReportCard
AccountsReportCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  reportname: PropTypes.string,

  apiFields: PropTypes.shape({
    format: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    params: PropTypes.shape({
      ID: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
  FileType: PropTypes.string,
};

export default AccountsReportCard;

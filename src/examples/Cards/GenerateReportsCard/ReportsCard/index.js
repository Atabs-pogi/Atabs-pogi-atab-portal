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
import StartDatePicker from "../../../../layouts/tables/employee/admin/textfields/start-date-picker";
import EndDatePicker from "../../../../layouts/tables/employee/admin/textfields/end-date-picker";

function GenerateReportsCard({ color, title, apiFields, reportname, percentage, icon, FileType }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  // eslint-disable-next-line no-param-reassign
  apiFields.params.Date_From = startDate;
  // eslint-disable-next-line no-param-reassign
  apiFields.params.Date_End = endDate;
  // eslint-disable-next-line no-param-reassign
  apiFields.format = FileType;

  const handleGenerateReport = () => {
    if (
      FileType !== "" &&
      startDate !== "" &&
      startDate !== null &&
      endDate !== "" &&
      endDate !== null
    ) {
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
      alert("Please specify all fields.");
    }
  };

  // console.log(startDate);
  console.log(apiFields.params.Date_From);
  console.log(apiFields.params.Date_End);
  console.log(reportname);
  console.log(FileType);

  const validateDateRange = (start, end) => {
    if (start && end) {
      if (new Date(start) >= new Date(end)) {
        alert("Start date can't be equal or later than the End date.");
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  const handleStartDate = (evt) => {
    const month = String(evt.$M + 1).padStart(2, "0");
    const day = String(evt.$D).padStart(2, "0");
    const date = `${evt.$y}/${month}/${day}`;
    setStartDate(date);
    validateDateRange(date, endDate);
  };

  const handleEndDate = (evt) => {
    const month = String(evt.$M + 1).padStart(2, "0");
    const day = String(evt.$D).padStart(2, "0");
    const date = `${evt.$y}/${month}/${day}`;
    setEndDate(date);
    validateDateRange(startDate, date);
  };

  return (
    <Card
      loading={loading}
      sx={{
        backgroundColor: "#eee",
        border: "solid 1px #bbb",
        width: "25vw",
        // width: "17vw",
      }}
    >
      <MDBox pt={1} px={2}>
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
        <MDBox
          sx={{
            pt: 2,
            pb: 6,
            px: 4,
          }}
        >
          <MDTypography sx={{ pl: 1.5, my: 1, fontSize: "13px", color: "black" }}>
            Date Duration
          </MDTypography>
          <MDBox sx={{ mb: 4 }}>
            <StartDatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDate}
              format="MM/DD/YYYY"
            />
          </MDBox>
          <MDBox>
            <EndDatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDate}
              format="MM/DD/YYYY"
            />
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider sx={{ height: "2px" }} mb={-2} />
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={12}
        mt={-2}
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

// Setting default values for the props of GenerateReportsCard
GenerateReportsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
  reportname: "",
  FileType: "",
};

// Typechecking props for the GenerateReportsCard
GenerateReportsCard.propTypes = {
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
      Date_From: PropTypes.string.isRequired,
      Date_End: PropTypes.string.isRequired,
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

export default GenerateReportsCard;

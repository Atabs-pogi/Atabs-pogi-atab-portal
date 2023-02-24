import * as React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import reportService from "services/generate-report-service";
import AddIcon from "@mui/icons-material/Add";
import SelectFileType from "../../../layouts/tables/employee/admin/textfields/select-fileType";

function GenerateReportsCard({ color, title, apiFields, filename, percentage, icon }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [FileType, setFileType] = React.useState("");

  // eslint-disable-next-line no-param-reassign
  apiFields.format = FileType;

  const handleGenerateReport = () => {
    if (FileType !== "") {
      setError("");
      setLoading(true);
      reportService
        .generateReport(apiFields, filename, FileType)
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
      alert("Please specify file type");
    }
  };

  console.log(apiFields.format);

  return (
    <Card
      sx={{
        border: "solid 1px #bbb",
        width: "17vw",
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
          }}
          lineHeight={1.25}
        >
          <MDTypography variant="button" fontWeight="light" color="text" mb={2}>
            {title || ""}
          </MDTypography>
          <MDBox>
            <SelectFileType
              fullWidth
              name="fileType"
              // disabled={loading}
              value={FileType}
              onChange={(evt) => setFileType(evt.target.value)}
            />
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider mb={-2} />
      <MDBox
        sx={{
          display: "flex",
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

// Setting default values for the props of ComplexStatisticsCard
GenerateReportsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
  filename: "",
};

// Typechecking props for the ComplexStatisticsCard
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
  filename: PropTypes.string,

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
};

export default GenerateReportsCard;

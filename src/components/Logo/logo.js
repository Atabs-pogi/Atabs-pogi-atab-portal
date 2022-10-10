// import PropTypes from "prop-types";
// import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import doaLogo from "assets/images/small-logos/doa-logo.png";
import MDBox from "components/MDBox";

function Logo() {
  return (
    <MDBox component="img" src={doaLogo} alt="Logo" height="50px" />
    // <ForestOutlinedIcon
    //   {...rest}
    //   {...{ color: light ? "white" : undefined }}
    //   sx={{
    //     fontSize: "30px !important",
    //   }}
    // />
  );
}

// Logo.defaultProps = {
//   light: false,
// };

// Logo.propTypes = {
//   light: PropTypes.bool,
// };

export default Logo;

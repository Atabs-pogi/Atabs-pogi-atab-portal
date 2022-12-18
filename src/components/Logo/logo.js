// import PropTypes from "prop-types";
// import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import finalLogo from "assets/images/small-logos/final_logo.jpg";
import MDBox from "components/MDBox";

function Logo() {
  return (
    <MDBox component="img" src={finalLogo} alt="Logo" height="50px" sx={{ borderRadius: "40%" }} />
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

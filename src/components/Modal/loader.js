import MDBox from "components/MDBox";
import CircularProgress from "@mui/material/CircularProgress";

export default function ModalLoader() {
  return (
    <MDBox
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
        bottom: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </MDBox>
  );
}

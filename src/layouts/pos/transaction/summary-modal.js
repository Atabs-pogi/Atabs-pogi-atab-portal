import { Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MiniModal from "components/Modal/mini";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SummaryModal({ open, onClose, transId }) {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose?.();
  };

  const handleViewHistory = () => {
    navigate("/sales");
  };

  return (
    <MiniModal open={open} onClose={handleClose} title="Transaction Successful">
      <Typography>Your transaction ({transId}) has been recorded successfully</Typography>
      {open && (
        <MDBox sx={{ display: "flex", justifyContent: "space-around", marginTop: 6 }}>
          {/* <MDButton color="info">Print Receipt</MDButton> */}
          <MDButton color="secondary" onClick={handleViewHistory}>
            View History
          </MDButton>
        </MDBox>
      )}
    </MiniModal>
  );
}

SummaryModal.defaultProps = {
  open: false,
  onClose: () => {},
  transId: null,
};

SummaryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  transId: PropTypes.string,
};

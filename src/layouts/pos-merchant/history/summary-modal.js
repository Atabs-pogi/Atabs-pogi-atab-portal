import React from "react";
import { Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MiniModal from "components/Modal/mini";
import PropTypes from "prop-types";
import posService from "services/pos-service";

export default function CashierSummaryModal({ open, onClose, transId, onSuccess }) {
  const [timer, setTimer] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    onClose?.();
  };

  const handleViewHistory = () => {
    if (timer === 0) {
      setLoading(true);
      posService
        .release(transId)
        .then(() => {
          alert("Success Payment");
          onSuccess?.();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    setTimer(5);
  }, [open]);

  React.useEffect(() => {
    let interval = null;
    if (open) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [open, timer]);

  return (
    <MiniModal open={open} onClose={handleClose} title="Release Payment">
      <Typography>
        Are you sure you want to release payment for transaction ({transId}) ?
      </Typography>
      {open && (
        <MDBox sx={{ display: "flex", justifyContent: "space-around", marginTop: 6 }}>
          {/* <MDButton color="info">Print Receipt</MDButton> */}
          <MDButton
            color={timer === 0 ? "success" : "secondary"}
            disabled={loading}
            onClick={handleViewHistory}
          >
            Release Payment {timer === 0 ? null : `(${timer})`}
          </MDButton>
        </MDBox>
      )}
    </MiniModal>
  );
}

CashierSummaryModal.defaultProps = {
  open: false,
  onClose: () => {},
  transId: null,
  onSuccess: () => {},
};

CashierSummaryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  transId: PropTypes.string,
  onSuccess: PropTypes.func,
};

import React from "react";
import {
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

export default function SummaryModal({ open, onClose, pay }) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Summary">
      <MDBox
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100%" }}
      >
        <Card sx={{ width: "30vw" }}>
          <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
            <IconButton onClick={handleClose}>
              <CloseIcon color="error" sx={{ cursor: "pointer" }} />
            </IconButton>
          </MDBox>
          {open && (
            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
              <TableBody>
                <Typography variant="h3" component="h2" sx={{ fontSize: 17, ml: 2, mb: 2 }}>
                  Summary
                </Typography>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Total Hours :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.totalHours}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Overtime :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.otHours}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Gross Pay :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.grossPay}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Withholding Tax :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.withholdingTax}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Total Deduction :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.totalDeduction}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Net Pay :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      {pay.netpay}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <MDBox m={3} align="center">
            <MDButton variant="contained" color="success" size="sm" sx={{ mr: 2 }}>
              Exit
            </MDButton>
          </MDBox>
        </Card>
      </MDBox>
    </Modal>
  );
}

SummaryModal.defaultProps = {
  open: false,
  onClose: () => {},
  pay: null,
};

SummaryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  pay: PropTypes.object,
};

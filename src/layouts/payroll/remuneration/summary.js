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
          <MDBox className="modal-header" sx={{ textAlign: "left", fontSize: "25px" }}>
            <Typography variant="h3" component="h2" sx={{ fontSize: 17, ml: 2, mb: 2 }}>
              Summary
            </Typography>
          </MDBox>
          {open && (
            <div style={{ height: "50vh", overflowY: "scroll" }}>
              <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                <TableBody>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total Work Hours :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalWorkHours}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total OT Hours :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalOtHours}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total Tardiness Hours :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalTardinessHours}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total Vacation Days :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalVacationDays}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total Sick Days :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalSickDays}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Regular Pay :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.regularPay}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Overtime Pay :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.overTimePay}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Vacation Pay :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.vacationPay}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Sick Pay :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.sickPay}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Tardiness Deduction :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.tardinessDeduction}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Total Benefits:
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.totalBenefit}
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
                        Mandatory Deductions :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.mandatoryDeductions}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        Taxable Income :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.taxableIncome}
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
                        Other Deductions :
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                        {pay.otherDeductions}
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
                        {pay.netPay}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
          <MDBox m={3} align="center">
            <MDButton variant="contained" color="success" size="sm" onClick={handleClose}>
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

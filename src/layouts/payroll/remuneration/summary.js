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
// import MiniModal from "components/Modal/mini";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

export default function SummaryModal({ open, onClose }) {
  // const navigate = useNavigate();
  const handleClose = () => {
    onClose?.();
  };

  // const handleViewHistory = () => {
  //   navigate("/payroll");
  // };

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
                      Value Here
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
                      Value Here
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Deductions :
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h3" component="h2" sx={{ fontSize: 17 }}>
                      Value Here
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <MDBox m={3} align="center">
            <MDButton variant="contained" color="success" size="sm" sx={{ mr: 2 }}>
              Save
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
};

SummaryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

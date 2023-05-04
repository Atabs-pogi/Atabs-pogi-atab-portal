import React from "react";
import Modal from "components/Modal";
import PropTypes from "prop-types";
import tuxyImg from "assets/images/small-logos/account.jpg";
import MDBox from "components/MDBox";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  // Typography,
} from "@mui/material";

// export const getUnitTotal = (item) => (item?.price || 0) * (item?.quantity || 0);

export default function ConfirmModal({ open, onClose, onSuccess, selected }) {
  const handleSave = () => {
    onSuccess?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Transaction Summary"
      picture={tuxyImg}
      saveText="Release"
      onSave={handleSave}
      noSuccess
    >
      <MDBox sx={{ maxHeight: "52vh", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead sx={{ display: "table-header-group" }}>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sub Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected?.items?.map?.((item) => (
                <TableRow
                  key={item?.transMerchantId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item?.name}
                  </TableCell>
                  <TableCell align="right">{item?.quantity}</TableCell>
                  <TableCell align="right">{item?.costPrice}</TableCell>
                  <TableCell align="right">
                    {parseFloat(item?.costPrice || 0) * parseFloat(item?.quantity || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
      <MDBox sx={{ textAlign: "right", mt: 2 }}>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Payment"
            value={selected?.paid || 0}
            readOnly
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Total"
            value={selected?.totalAmount || 0}
            readOnly
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Change"
            value={selected?.changed || 0}
            readOnly
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox>
      </MDBox>
    </Modal>
  );
}

ConfirmModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

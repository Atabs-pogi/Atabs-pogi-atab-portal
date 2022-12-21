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
  Typography,
} from "@mui/material";

export const getUnitTotal = (item) => (item?.price || 0) * (item?.quantity || 0);

export default function ConfirmModal({ open, onClose, onSuccess, selected }) {
  // const [payment, setPayment] = React.useState(null);
  const handleSave = () => {
    onSuccess?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  const totalPrice = selected?.items?.reduce((val, item) => val + getUnitTotal(item), 0) || 0;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Transaction Summary"
      picture={tuxyImg}
      saveText="Release"
      // disabled={payment < totalPrice}
      onSave={handleSave}
      noSuccess={selected?.status}
    >
      <MDBox sx={{ maxHeight: "52vh", overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Farmer: {selected?.firstName} {selected?.middleName} {selected?.lastName}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead sx={{ display: "table-header-group" }}>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity (kg)</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sub Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected?.items?.map?.((item) => (
                <TableRow key={item?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {item?.tuxyName} ({item?.type}) {item?.quality}
                  </TableCell>
                  <TableCell align="right">{item?.quantity}</TableCell>
                  <TableCell align="right">{item?.price}</TableCell>
                  <TableCell align="right">{getUnitTotal(item)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
      <MDBox sx={{ textAlign: "right", mt: 2 }}>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField label="Total" value={totalPrice} readOnly variant="outlined" sx={{ m: 1 }} />
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

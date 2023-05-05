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
} from "@mui/material";
import posMerchantService from "services/pos-merchant-service";

export default function CheckoutModal({ open, onClose, items, onSuccess }) {
  const [payment, setPayment] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handlePayment = (evt) => {
    if (evt?.target?.value.length === 0) {
      setPayment(0);
    } else if (!Number.isNaN(evt?.target?.value)) setPayment(parseFloat(evt?.target?.value));
  };

  console.log(items);

  const handleSave = () => {
    setError("");
    setLoading(true);
    setPayment(0);
    posMerchantService
      .save({
        items: items?.map?.((item) => [
          {
            productId: item?.id,
            quantity: item?.quantity,
          },
        ]),
        paid: payment,
      })
      .then((t) => {
        onSuccess?.(t?.transMerchantId || t);
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setError("");
    setLoading(false);
    onClose?.();
  };

  const totalPrice =
    items?.reduce((val, item) => {
      const subTotal = parseFloat(item?.costPrice || 0) * parseFloat(item?.quantity || 0);
      return val + subTotal;
    }, 0) || 0;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Transaction Summary"
      picture={tuxyImg}
      noCancel
      saveText="Confirm"
      disabled={payment < totalPrice}
      onSave={handleSave}
      error={error}
      loading={loading}
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
              {items?.map?.((item) => (
                <TableRow key={item?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {item?.productName}
                  </TableCell>
                  <TableCell align="right">{item?.quantity}</TableCell>
                  <TableCell align="right">{parseFloat(item?.costPrice)}</TableCell>
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
            value={payment || 0}
            variant="outlined"
            onChange={handlePayment}
            sx={{ m: 1 }}
          />
        </MDBox>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Total"
            value={totalPrice || 0}
            readOnly
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox>
        <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Change"
            value={(payment || 0) - (totalPrice || 0)}
            disabled
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox>
      </MDBox>
    </Modal>
  );
}

CheckoutModal.defaultProps = {
  open: false,
  onClose: () => {},
  items: [],
  onSuccess: () => {},
};

CheckoutModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
};

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
import posService from "services/pos-service";
import { getUnitPrice, getUnitTotal } from "./cart";

export default function CheckoutModal({ open, onClose, items, onSuccess, farmer }) {
  const [payment, setPayment] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // const handlePayment = (evt) => {
  //   if (evt?.target?.value.length === 0) {
  //     setPayment(0);
  //   } else if (!Number.isNaN(evt?.target?.value)) setPayment(parseFloat(evt?.target?.value));
  // };

  const handleSave = () => {
    setError("");
    setLoading(true);
    setPayment(0);
    posService
      .save({
        farmerId: farmer?.id,
        items: items?.map?.((item) => ({
          tuxyId: item?.tuxyId,
          quality: item?.quality,
          quantity: item?.quantity,
        })),
        payment,
      })
      // .then((t) => {
      //   onSuccess?.(t?.transId);
      // })
      .then(() => {
        onSuccess?.(1000);
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

  const totalPrice = items?.reduce((val, item) => val + getUnitTotal(item), 0) || 0;
  console.log(farmer);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Transaction Summary"
      picture={tuxyImg}
      noCancel
      saveText="Confirm"
      // disabled={payment < totalPrice}
      onSave={handleSave}
      error={error}
      loading={loading}
    >
      <MDBox sx={{ maxHeight: "52vh", overflow: "auto" }}>
        <Typography>
          Farmer {farmer?.firstName} {farmer?.middleName} {farmer?.lastName}
        </Typography>
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
                    {item?.name} ({item?.quality})
                  </TableCell>
                  <TableCell align="right">{item?.quantity}</TableCell>
                  <TableCell align="right">{getUnitPrice(item)}</TableCell>
                  <TableCell align="right">{getUnitTotal(item)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
      <MDBox sx={{ textAlign: "right", mt: 2 }}>
        {/* <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Payment"
            value={payment}
            variant="outlined"
            onChange={handlePayment}
            sx={{ m: 1 }}
          />
        </MDBox> */}
        <MDBox sx={{ display: "inline-block" }}>
          <TextField label="Total" value={totalPrice} readOnly variant="outlined" sx={{ m: 1 }} />
        </MDBox>
        {/* <MDBox sx={{ display: "inline-block" }}>
          <TextField
            label="Change"
            value={payment - totalPrice}
            disabled
            variant="outlined"
            sx={{ m: 1 }}
          />
        </MDBox> */}
      </MDBox>
    </Modal>
  );
}

CheckoutModal.defaultProps = {
  open: false,
  onClose: () => {},
  items: [],
  onSuccess: () => {},
  farmer: null,
};

CheckoutModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  farmer: PropTypes.object,
};

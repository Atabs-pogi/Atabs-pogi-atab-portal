import React from "react";
import MDBox from "components/MDBox";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import costingBillService from "services/costing-bill-service";
import { v4 as uuid } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import MDButton from "components/MDButton";
import generatingBills from "services/generating-bills";
import TextFieldDatePicker from "layouts/tables/employee/admin/textfields/date-picker";

function BillSelect({ items, ...props }) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      sx={{ width: "30%", height: "45px" }}
      {...props}
    >
      {items?.map?.((item) => (
        <MenuItem value={item?.id}>{item?.vendorName}</MenuItem>
      ))}
    </Select>
  );
}

BillSelect.defaultProps = {
  items: [],
  value: null,
  onChange: () => {},
};
// Typechecking props of the MDAlert
BillSelect.propTypes = {
  items: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default function BillsModal({ open, onClose, onSuccess }) {
  const [items, setItems] = React.useState([]);
  const [bills, setBills] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [encodeDate, setEncodeDate] = React.useState(null);
  const [paymentDate, setPaymentDate] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    costingBillService
      .getAllBills()
      .then((b) => setBills(b))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setItems([
      ...items,
      {
        billId: uuid(),
        id: bills?.[0]?.id,
        amount: null,
        dateIssued: null,
        dateDue: null,
        dateReceived: null,
        dateDelivered: null,
      },
    ]);
  };

  const handleDelete = (i) => () => {
    setItems(items?.filter((item) => item !== i));
  };

  const handleBillChange = (i) => (evt) => {
    const nItems = [...items];
    nItems[i].id = evt.target.value;
    setItems(nItems);
  };

  const handleIssuedDateChange = (i) => (date) => {
    const nItems = [...items];
    nItems[i].dateIssued = new Date(date);
    setItems(nItems);
  };
  const handleDueDateChange = (i) => (date) => {
    const nItems = [...items];
    nItems[i].dateDue = new Date(date);
    setItems(nItems);
  };
  const handleReceiptDateChange = (i) => (date) => {
    const nItems = [...items];
    nItems[i].dateReceived = new Date(date);
    setItems(nItems);
  };
  const handleDeliveryDateChange = (i) => (date) => {
    const nItems = [...items];
    nItems[i].dateDelivered = new Date(date);
    setItems(nItems);
  };

  const handleAmountChange = (i) => (evt) => {
    const nItems = [...items];
    nItems[i].amount = evt.target.value;
    setItems(nItems);
  };

  const total = items?.reduce((val, curr) => parseFloat(curr?.amount || 0) + val, 0);

  const handleSave = () => {
    setLoading(true);
    generatingBills
      .addBill({
        paymentDate,
        encodeDate,
        totalBillAmount: total,
        items: items?.map(({ id, amount, dateIssued, dateDue, dateReceived, dateDelivered }) => ({
          vendorName: bills?.find((b) => b.id === id).vendorName,
          issuanceDate: dateIssued,
          dueDate: dateDue,
          receiptDate: dateReceived,
          deliveryDate: dateDelivered,
          billAmount: amount,
        })),
      })
      .then(() => {
        setItems([]);
        onSuccess?.();
      })
      .catch((err) => setError(err?.message))
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    onClose?.();
  };

  console.log(items);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", maxHeight: "100vh", overflowX: "auto" }}
      >
        <MDBox sx={{ width: "100%", height: "85vh", px: 15, mt: 10 }}>
          <TableContainer component={Paper} elevation={4} sx={{ height: "80vh", p: 3 }}>
            <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
              <IconButton p={-3}>
                <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
              </IconButton>
            </MDBox>
            <MDBox mb={1}>
              <TextFieldDatePicker
                label="Encode Date"
                txprops={{ sx: { width: 200, mx: 2 } }}
                value={encodeDate}
                onChange={(date) => setEncodeDate(new Date(date))}
                format="MM/DD/YYYY"
                disabled={loading}
              />
              <TextFieldDatePicker
                label="Payment Date"
                txprops={{ sx: { width: 200, mx: 2 } }}
                value={paymentDate}
                onChange={(date) => setPaymentDate(new Date(date))}
                format="MM/DD/YYYY"
                disabled={loading}
              />
            </MDBox>

            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <TableCell>
                    Generate Bill
                    <IconButton
                      disabled={loading}
                      variant="contained"
                      color="info"
                      onClick={handleAdd}
                    >
                      <AddCircleIcon fontSize="large" color="success" sx={{ pl: 0 }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map?.((item, index) => (
                  <TableRow
                    key={item?.billId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <IconButton
                        disabled={loading}
                        variant="contained"
                        color="info"
                        onClick={handleDelete(item)}
                        sx={{ mr: 2 }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                      <BillSelect
                        disabled={loading}
                        items={bills}
                        value={item?.id}
                        onChange={handleBillChange(index)}
                      />
                      <TextFieldDatePicker
                        label="Issuance Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.dateIssued}
                        onChange={handleIssuedDateChange(index)}
                        format="MM/DD/YYYY"
                        disabled={loading}
                      />
                      <TextFieldDatePicker
                        label="Due Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.dateDue}
                        onChange={handleDueDateChange(index)}
                        format="MM/DD/YYYY"
                        disabled={loading}
                      />
                      <TextFieldDatePicker
                        label="Receipt Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.dateReceived}
                        onChange={handleReceiptDateChange(index)}
                        format="MM/DD/YYYY"
                        disabled={loading}
                      />
                      <TextFieldDatePicker
                        label="Delivery Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.dateDelivered}
                        onChange={handleDeliveryDateChange(index)}
                        format="MM/DD/YYYY"
                        disabled={loading}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="Amount"
                        value={item?.amount}
                        onChange={handleAmountChange(index)}
                        type="number"
                        disabled={loading}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <MDBox p={2} textAlign="right">
              <TextField value={total} label="Total" readOnly type="number" />
            </MDBox>
            {open && (
              <MDBox mt={2} p={2} sx={{ textAlign: "right" }}>
                {error}
                <MDButton
                  disabled={
                    total === 0 ||
                    !encodeDate ||
                    !paymentDate ||
                    // !item?.dateIssued ||
                    // !item?.dateDue ||
                    // !item?.dateReceived ||
                    // !item?.dateDelivered ||
                    loading
                  }
                  variant="contained"
                  onClick={handleSave}
                  color="success"
                >
                  SAVE
                </MDButton>
              </MDBox>
            )}
          </TableContainer>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

BillsModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};

BillsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

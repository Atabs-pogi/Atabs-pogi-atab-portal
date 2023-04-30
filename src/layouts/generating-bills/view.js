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
import TextFieldDatePicker from "layouts/tables/employee/admin/textfields/date-picker";

function BillSelect({ items, ...props }) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      sx={{ width: "100%", height: "50px" }}
      {...props}
    >
      {items?.map?.((item) => (
        <MenuItem value={item?.id}>{item?.name}</MenuItem>
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

export default function BillsViewModal({ selected, open, onClose }) {
  const handleClose = () => {
    onClose?.();
  };

  console.log(selected);

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
                value={selected?.encodeDate}
                format="MM/DD/YYYY"
                readOnly
              />
              <TextFieldDatePicker
                label="Payment Date"
                txprops={{ sx: { width: 200, mx: 2 } }}
                value={selected?.paymentDate}
                format="MM/DD/YYYY"
                readOnly
              />
            </MDBox>
            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <TableCell>Bill Report</TableCell>
                  <TableCell />
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selected?.items?.map?.((item) => (
                  <TableRow
                    key={item?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {item?.vendorName}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <TextFieldDatePicker
                        label="Issuance Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.issuanceDate}
                        format="MM/DD/YYYY"
                        readOnly
                      />
                      <TextFieldDatePicker
                        label="Due Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.dueDate}
                        format="MM/DD/YYYY"
                        readOnly
                      />
                      <TextFieldDatePicker
                        label="Receipt Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.receiptDate}
                        format="MM/DD/YYYY"
                        readOnly
                      />
                      <TextFieldDatePicker
                        label="Delivery Date"
                        txprops={{ sx: { width: 200, mx: 2 } }}
                        value={item?.deliveryDate}
                        format="MM/DD/YYYY"
                        readOnly
                      />
                    </TableCell>

                    <TableCell align="right">
                      <TextField value={item?.billAmount} type="number" readOnly />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <MDBox p={2} textAlign="right">
              <TextField
                value={selected?.totalBillAmount || 0}
                label="Total"
                readOnly
                type="number"
              />
            </MDBox>
          </TableContainer>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

BillsViewModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
};

BillsViewModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

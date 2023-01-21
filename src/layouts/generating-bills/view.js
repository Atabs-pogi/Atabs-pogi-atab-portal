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
import DeleteIcon from "@mui/icons-material/Delete";

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
              <TextField value={selected?.monthYear} label="Date" disabled />
            </MDBox>
            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <TableCell>Costing Bill</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selected?.items?.map?.((item) => (
                  <TableRow
                    key={item?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <IconButton disabled variant="contained" color="info" sx={{ mr: 2 }}>
                        <DeleteIcon color="error" />
                      </IconButton>
                      <BillSelect disabled items={selected?.bills} value={selected?.item?.id} />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="Amount"
                        value={selected?.item?.amount}
                        type="number"
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <MDBox p={2} textAlign="right">
              <TextField value={selected?.totalAmount || 0} label="Total" readOnly type="number" />
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

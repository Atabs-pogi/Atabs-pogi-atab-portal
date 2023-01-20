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
} from "@mui/material";
import PropTypes from "prop-types";
import costingBillService from "services/costing-bill-service";
import { v4 as uuid } from "uuid";
import MDButton from "components/MDButton";
import generatingBills from "services/generating-bills";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

export default function BillsData() {
  const [items, setItems] = React.useState([]);
  const [bills, setBills] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const today = new Date();
  const month = monthNames[today.getMonth()];
  const [date, setDate] = React.useState(`${month} ${today.getFullYear()}`);
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
        amount: 0,
      },
    ]);
  };

  const handleAmountChange = (i) => (evt) => {
    const nItems = [...items];
    nItems[i].amount = evt.target.value;
    setItems(nItems);
  };

  const handleBillChange = (i) => (evt) => {
    const nItems = [...items];
    nItems[i].id = evt.target.value;
    setItems(nItems);
  };

  const total = items?.reduce((val, curr) => parseFloat(curr?.amount || 0) + val, 0);

  const handleSave = () => {
    setSaving(true);
    generatingBills
      .addBill({
        monthYear: date,
        totalAmount: total,
        items: items?.map(({ id, amount }) => ({
          category: bills?.find((b) => b.id === id).name,
          amount,
        })),
      })
      .then(() => alert("Success"))
      .catch((err) => setError(err?.message))
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <MDBox>
        <MDBox p={2} style={{ height: 530, width: "100%", position: "relative" }}>
          Loading
        </MDBox>
      </MDBox>
    );
  }

  return (
    <MDBox>
      <MDBox p={2} style={{ height: 530, width: "100%", position: "relative" }}>
        <MDBox mb={1}>
          <TextField
            value={date}
            label="Date"
            onChange={(evt) => setDate(evt.target.value)}
            disabled={saving}
          />
        </MDBox>
        <TableContainer component={Paper} elevation={4} sx={{ maxHeight: "400px" }}>
          <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
            <TableHead sx={{ display: "table-header-group" }}>
              <TableRow>
                <TableCell>Costing Bill</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map?.((item, index) => (
                <TableRow
                  key={item?.billId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <BillSelect
                      disabled={saving}
                      items={bills}
                      value={item?.id}
                      onChange={handleBillChange(index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={item?.amount}
                      onChange={handleAmountChange(index)}
                      type="number"
                      disabled={saving}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <MDButton disabled={saving} variant="contained" color="info" onClick={handleAdd}>
                    Add
                  </MDButton>
                </TableCell>
                <TableCell align="right">
                  <TextField value={total} label="Total" readOnly type="number" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <MDBox mt={2} sx={{ textAlign: "right" }}>
          {error}
          <MDButton disabled={saving} variant="contained" onClick={handleSave} color="success">
            SAVE
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

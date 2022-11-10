import React from "react";
import MDBox from "components/MDBox";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, origprc, weight) {
  const subtotal = priceRow(origprc, weight);
  return { desc, origprc, weight, subtotal };
}

function total(items) {
  return items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Fiber 1", 10.01, 50, 1.15),
  createRow("Fiber 2", 10, 45.99),
  createRow("Fiber 3", 3, 17),
  createRow("Fiber 4", 2, 17.99),
  createRow("Fiber 5", 2, 17.99),
  createRow("Fiber 6", 2, 17.99),
];

const invoiceTotal = total(rows);

export default function SpanningTable() {
  return (
    <MDBox
      py={2}
      px={4}
      sx={{
        marginTop: "20px",
        width: "120vh",
        borderRadius: "20px",
        backgroundColor: "#fff",
      }}
    >
      <TableContainer sx={{ minWidth: 700, width: "100%", margin: "auto" }} component={Paper}>
        <Box
          sx={{
            minWidth: 700,
            width: "100%",
            margin: "auto",
            height: "25vh",
            overflowY: "scroll",
          }}
        >
          <Table sx={{ width: "100%", margin: "auto" }} aria-label="spanning table">
            <TableHead
              sx={{
                display: "table-header-group",
                backgroundColor: "#fff",
                position: "sticky",
                top: "0px",
                marginRight: "50px",
                zIndex: "1",
              }}
            >
              <TableRow>
                <TableCell align="center">Remove</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Original Price</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell align="center" className="item-action">
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />
                  </TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.origprc}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{ccyFormat(row.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", padding: "15px" }}>
          <Typography variant="h5" component="h5" sx={{ marginRight: "15vh" }}>
            Total:
          </Typography>
          <Typography variant="h5" component="h5" sx={{ marginRight: "30px" }}>
            {ccyFormat(invoiceTotal)}
          </Typography>
        </Box>
      </TableContainer>

      <MDBox
        className="submit-box"
        sx={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <MDButton variant="contained" color="dark" className="submit-btn">
          Generate Receipt
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

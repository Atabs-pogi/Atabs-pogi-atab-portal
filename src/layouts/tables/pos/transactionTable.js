import React from "react";
import MDBox from "components/MDBox";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

function createRow(desc, grade, origprc, weight) {
  const subtotal = priceRow(origprc, weight);
  return { desc, grade, origprc, weight, subtotal };
}

function total(items) {
  return items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Fiber 1", "S1", 10.01, 50, 1.15),
  createRow("Fiber 2", "S1", 10, 45.99),
  createRow("Fiber 3", "S1", 3, 17),
  createRow("Fiber 4", "S1", 2, 17.99),
  createRow("Fiber 5", "S1", 2, 17.99),
  createRow("Fiber 6", "S1", 2, 17.99),
];

const invoiceTotal = total(rows);

export default function SpanningTable() {
  return (
    <MDBox
      pt={2}
      sx={{
        borderRadius: "20px",
        backgroundColor: "#fff",
      }}
    >
      <MDBox
        ml={4}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
          width: "12vw",
          padding: "20px 10px",
        }}
      >
        <Typography variant="h5" component="h5">
          Budget:
        </Typography>
        <Typography variant="h5" component="h5">
          5000
        </Typography>
      </MDBox>
      <MDBox px={4} sx={{ minWidth: 700, width: "100%", margin: "auto" }}>
        <Box
          sx={{
            minWidth: 700,
            height: "23vh",
            width: "100%",
            margin: "auto",
            overflowY: "scroll",
            border: "solid 1px #ccc",
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
                <TableCell align="center" width="100">
                  Remove
                </TableCell>
                <TableCell width="180">Product Name</TableCell>
                <TableCell align="right" width="100">
                  Grade
                </TableCell>
                <TableCell align="right" width="100">
                  Original Price
                </TableCell>
                <TableCell align="right" width="100">
                  Weight
                </TableCell>
                <TableCell align="right" width="100">
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell align="center" className="item-action">
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />
                  </TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.grade}</TableCell>
                  <TableCell align="right">{row.origprc}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{ccyFormat(row.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ textAlign: "right", padding: "15px" }}>
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Typography
              variant="h5"
              component="h5"
              sx={{ verticalAlign: "center", marginRight: "15vh" }}
            >
              Total:
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              sx={{ verticalAlign: "center", marginRight: "18px" }}
            >
              {ccyFormat(invoiceTotal)}
            </Typography>
          </Box>

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
        </Box>
      </MDBox>
    </MDBox>
  );
}
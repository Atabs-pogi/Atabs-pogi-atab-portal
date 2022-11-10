import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

// const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, origprc, weight) {
  const price = priceRow(origprc, weight);
  return { desc, origprc, weight, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Fiber 1", 10.01, 50, 1.15),
  createRow("Fiber 2", 10, 45.99),
  createRow("Fiber 3", 3, 17),
  createRow("Fiber 4", 2, 17.99),
  createRow("Fiber 5", 2, 17.99),
  createRow("Fiber 6", 2, 17.99),
];

const invoiceTotal = subtotal(rows);

export default function SpanningTable() {
  return (
    <MDBox>
      <TableContainer sx={{ minWidth: 700, width: "100%", margin: "auto" }} component={Paper}>
        <Grid
          item
          xs={6}
          sx={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              my: 1,
              mx: 1,
            }}
          />
        </Grid>
        <Box
          sx={{
            minWidth: 700,
            width: "100%",
            margin: "auto",
            height: "35vh",
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
              }}
            >
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Original Price</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.origprc}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <MDBox sx={{ display: "flex", justifyContent: "end", padding: "15px" }}>
          <Typography variant="h5" component="h5" sx={{ marginRight: "15vh" }}>
            Total:
          </Typography>
          <Typography variant="h5" component="h5" sx={{ marginRight: "30px" }}>
            {ccyFormat(invoiceTotal)}
          </Typography>
        </MDBox>
      </TableContainer>

      <Divider />
      <MDBox className="center-submit-btn" sx={{ textAlign: "center", marginTop: "50px" }}>
        <MDButton variant="contained" color="dark" className="submit-btn">
          Release Payment
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

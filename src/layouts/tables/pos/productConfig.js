import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import "./style.css";

// import TransactionTable from "./transactionTable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

import fiberServices from "../../../services/fiber-services";

function ProductConfig() {
  const [fibers, setFibers] = React.useState([]);

  const [fiber, setFiber] = React.useState("");
  const [weight, getWeight] = React.useState(0);
  // const [price, getPrice] = React.useState(0);
  const [OGprice, getOGPrice] = React.useState(0);
  const [grade, getGrade] = React.useState("");

  const [dispTtl, getTotal] = React.useState("");

  const [table, setTable] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  const [bool, setBool] = React.useState(true);

  function gettingFibers() {
    useEffect(() => {
      fiberServices
        .getFibers()
        .then((response) => response.json())
        .then((response) => setFibers(response));
    }, []);
  }
  gettingFibers();
  console.log(fibers);

  // for filtering fibers and grades on drop down
  const fibersName = [];
  const fibersGrade = [];

  fibers.map((data) => fibersName.push(data.name));
  fibers.map((data) => fibersGrade.push(data.grade));

  const uniqueName = [...new Set(fibersName)];
  const uniqueGrade = [...new Set(fibersGrade)];
  // --------------------------------------------

  // fiber onChange
  const handleFiber = (event) => {
    setFiber(event.target.value);
    setBool(false);
  };

  // Setting original price
  function gettingOGPrice() {
    fiberServices
      .getOGPrice(fiber, grade)
      .then((response) => response.json())
      .then((json) => getOGPrice(json));
  }
  gettingOGPrice();

  function CalculateTotal(kgweight, prc) {
    return kgweight * prc;
  }

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  // for Calculate Button
  const Calculate = () => {
    const newTotal = CalculateTotal(weight, OGprice);
    getTotal(ccyFormat(newTotal));
  };

  function priceRow(origprc, Weight) {
    return origprc * Weight;
  }

  function createRow(name, Grade, origprc, Weight) {
    const subtotal = priceRow(origprc, Weight);
    return { name, Grade, origprc, Weight, subtotal };
  }

  const rows = [
    createRow("Fiber 2", "S1", 10, 45.99),
    createRow("Fiber 3", "S1", 3, 17),
    createRow("Fiber 4", "S1", 2, 17.99),
    createRow("Fiber 5", "S1", 2, 17.99),
  ];

  // for Add to Table Button
  const AddToTable = async () => {
    if (fiber === "" || grade === "" || OGprice === 0 || weight === "") {
      alert("Some fields are not initialized");
    } else {
      const subtotal = OGprice * weight;
      setTable([{ fiber, grade, OGprice, weight, subtotal }]);
      setBool(true);
      console.log(table);
    }
    const pushRow = {
      name: "Fiber 2",
      Grade: "S1",
      origprc: 10,
      Weight: 45.99,
      subtotal: 45.99,
    };
    rows.push(pushRow);
    console.log(rows);
  };
  console.log(table);

  // ------------------------------------------------------------------

  function total(items) {
    return items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);
  }

  // const fiber2 = ["Fiber 2", "S1", 10, 45.99];

  const clickmoko = (product) => {
    // check if the adding product exist
    // const productname = product.find((prod) => prod.fiber);

    const findProductInCart = cart.find((fiberVar) => fiberVar.name === product.fiber);
    console.log(product.fiber);

    if (findProductInCart) {
      const newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.name === product.fiber) {
          newItem = {
            ...cartItem,
          };
          newCart.push(product);
        } else {
          newCart.push(product);
          alert(newItem);
        }
      });
      alert(newCart);
      setCart(newCart);
    } else {
      // const addingProduct = {
      //   ...product,
      // };
      const subtotal = OGprice * weight;
      setCart([{ fiber, grade, OGprice, weight, subtotal }]);
      console.log({ fiber, grade, OGprice, weight, subtotal });
    }
  };

  // const clickmoko = () => {
  //   const pushRow = {
  //     name: "Fiber 2",
  //     Grade: "S1",
  //     origprc: 10,
  //     Weight: 45.99,
  //     subtotal: 45.99,
  //   };
  //   test.push(pushRow);
  //   console.log(test);
  // };

  const invoiceTotal = total(rows);

  return (
    <MDBox>
      <MDBox
        className="item-process"
        py={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          width: "60%",
        }}
      >
        <Grid>
          <Grid>
            <Grid mb={4}>
              <Typography
                mb={1}
                variant="h5"
                component="h5"
                className="item-labels"
                sx={{ fontSize: "12px", color: "#aaa" }}
              >
                Specify Fiber:
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fiber</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fiber}
                  label="Fiber"
                  onChange={handleFiber}
                  sx={{ py: 1.5 }}
                >
                  {/* {(() => {
                  if (fiber) {
                    return alert(fiber);
                  }
                  return "";
                })()} */}
                  {uniqueName.map((data) => (
                    <MenuItem value={data}>{data}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid mb={4}>
              <Typography
                mb={1}
                variant="h5"
                component="h5"
                className="item-labels"
                sx={{ fontSize: "12px", color: "#aaa" }}
              >
                Specify Farmer:
              </Typography>
              <TextField
                id="outlined-basic"
                label="Farmer's ID"
                variant="outlined"
                value="2019101"
                readonly
                sx={{ fontSize: "18px", width: "200px" }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid>
          <Grid mb={4}>
            <Typography
              mb={1}
              variant="h5"
              component="h5"
              className="item-labels"
              sx={{ fontSize: "12px", color: "#aaa" }}
            >
              Specify Grade:
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="gradeSelectInput">Grade</InputLabel>
              <Select
                labelId="gradeSelect"
                id="gradeSelect"
                value={grade}
                label="Grade"
                disabled={bool}
                onChange={(newValue) => getGrade(newValue.target.value)}
                sx={{ py: 1.5 }}
              >
                {/* {fibersArray.map((fiber) => (
                <MenuItem value={fiber.name}>{fiber.name}</MenuItem>
              ))} */}
                {/* {(() => {
                  if (fiber) {
                    return alert(fiber);
                  }
                  return "";
                })()} */}
                {uniqueGrade.map((data) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid>
            <Typography
              mb={1}
              variant="h5"
              component="h5"
              className="item-labels"
              sx={{ fontSize: "12px", color: "#aaa" }}
            >
              Specify the weight in kilogram:
            </Typography>
            <TextField
              id="weightSpecified"
              label="Weight (kg)"
              variant="outlined"
              onChange={(newValue) => getWeight(newValue.target.value)}
              sx={{ fontSize: "18px", width: "200px" }}
            />
          </Grid>

          <Grid>
            <Grid sx={{ textAlign: "center" }}>
              <MDButton
                onClick={Calculate}
                variant="contained"
                color="success"
                className="compute-btn"
                sx={{
                  marginTop: "3vh",
                  height: "45px",
                  padding: "8px 30px",
                  border: "solid 2px #ccc",
                  borderRadius: "30px",
                  color: "#fff",
                  backgroundColor: "green",
                }}
              >
                Calculate
              </MDButton>
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid>
          <Grid mb={4}>
            <Typography
              mb={1}
              variant="h5"
              component="h5"
              className="item-labels"
              sx={{ fontSize: "12px", color: "#aaa" }}
            >
              Fiber`s Original Price:
            </Typography>
            <TextField
              id="origPrc"
              label="Original Price"
              variant="outlined"
              value={OGprice}
              // onChange={(newValue) => getPrice(newValue.target.value)}
              readonly
              sx={{ fontSize: "18px", width: "200px" }}
            />
          </Grid>

          <Grid>
            <Typography
              mb={1}
              variant="h5"
              component="h5"
              className="item-labels"
              sx={{ fontSize: "12px", color: "#aaa" }}
            >
              Total Amount:
            </Typography>
            <TextField
              id="total"
              label="Total"
              variant="outlined"
              value={dispTtl}
              sx={{ fontSize: "18px", width: "200px" }}
              readonly
            />
          </Grid>
          <Grid sx={{ textAlign: "center" }}>
            <MDButton
              onClick={AddToTable}
              variant="contained"
              color="success"
              className="add-btn"
              sx={{
                marginTop: "3vh",
                height: "45px",
                padding: "8px 30px",
                border: "solid 2px #ccc",
                borderRadius: "30px",
                color: "#fff",
                backgroundColor: "green",
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add to Table
            </MDButton>
          </Grid>
        </Grid>
        {/* <TransactionTable name={fiber} /> */}
      </MDBox>
      <MDBox
        pt={2}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#fff",
        }}
      >
        <MDButton onClick={() => clickmoko(...table)}>Add</MDButton>
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
                  <TableCell width="180">Fiber Name</TableCell>
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.Grade}</TableCell>
                    <TableCell align="right">{row.origprc}</TableCell>
                    <TableCell align="right">{row.Weight}</TableCell>
                    <TableCell align="right">{ccyFormat(row.subtotal)}</TableCell>
                  </TableRow>
                ))}
                ;
              </TableBody>
            </Table>
            <table>
              <thead>
                <tr>
                  <td>Remove</td>
                  <td>Fiber Name</td>
                  <td>Grade</td>
                  <td>Weight</td>
                  <td>Price</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {cart.map((row) => (
                  <tr>
                    <td>Remove</td>
                    <td>{row.name}</td>
                    <td>{row.Grade}</td>
                    <td>{row.Weight}</td>
                    <td>{row.origprc}</td>
                    <td>{row.subtotal}</td>
                  </tr>
                ))}
                ;
              </tbody>
            </table>
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
    </MDBox>
  );
}

export default ProductConfig;

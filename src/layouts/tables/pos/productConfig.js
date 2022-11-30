import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import {
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

import fiberServices from "../../../services/fiber-services";

function ProductConfig() {
  const [fibers, setFibers] = React.useState([]);

  const [fiber, setFiber] = React.useState("");
  const [weight, getWeight] = React.useState(0);
  const [getPrice] = React.useState("");
  const [OGprice, getOGPrice] = React.useState("");
  const [grade, getGrade] = React.useState("");

  const [dispTtl, getTotal] = React.useState("");

  const [table, setTable] = React.useState([]);

  const [bool, setBool] = React.useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/fiber/getFibers")
      .then((response) => response.json())
      .then((json) => setFibers(json));
  }, []);
  console.log(fibers);

  // for filtering fibers and grades on drop down
  const fibersName = [];
  const fibersGrade = [];

  fibers.map((data) => fibersName.push(data.name));
  fibers.map((data) => fibersGrade.push(data.grade));

  const uniqueName = [...new Set(fibersName)];
  const uniqueGrade = [...new Set(fibersGrade)];
  // -------------------------------------------

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

  // for Add to Table Button
  const AddToTable = async () => {
    if (fiber === "" || grade === "" || OGprice === 0 || weight === "") {
      alert("Some fields are not initialized");
    } else {
      const subtotal = OGprice * weight;
      setTable([fiber, grade, OGprice, weight, subtotal]);
      setBool(true);
    }
  };
  console.log(table);

  return (
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
            onChange={(newValue) => getPrice(newValue.target.value)}
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
    </MDBox>
  );
}

export default ProductConfig;

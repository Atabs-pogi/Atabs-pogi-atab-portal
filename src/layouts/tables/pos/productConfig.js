import React from "react";
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

function ProductConfig() {
  const [fiberName, setFiber] = React.useState("");

  const handleChange = (event) => {
    setFiber(event.target.value);
  };

  return (
    <MDBox
      className="item-process"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "auto",
        width: "60%",
      }}
    >
      <Grid>
        <Grid mb={4}>
          <Typography
            mb={2}
            variant="h5"
            component="h5"
            className="item-labels"
            sx={{ fontSize: "12px", color: "#aaa" }}
          >
            Specify the Fiber:
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="FiberDropDownLabel">Fiber Name</InputLabel>
            <Select
              labelId="FiberDropDownLabel"
              id="FiberDropDownLabel"
              value={fiberName}
              label="Fiber Name"
              onChange={handleChange}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "15px",
                width: "200px",
                height: "44px",
              }}
            >
              <MenuItem value="Abaca">Abaca S1</MenuItem>
              <MenuItem value="AbacaS2">Abaca S2</MenuItem>
              <MenuItem value="AbacaS3">Abaca S3</MenuItem>
              <MenuItem value="AbacaS4">Abaca S4</MenuItem>
              <MenuItem value="TuxyS1">Tuxy S1</MenuItem>
              <MenuItem value="TuxyS2">Tuxy S2</MenuItem>
              <MenuItem value="TuxyS3">Tuxy S3</MenuItem>
              <MenuItem value="TuxyS4">Tuxy S4</MenuItem>
              <MenuItem value="FiberS1">Fiber S1</MenuItem>
              <MenuItem value="FiberS2">Fiber S2</MenuItem>
              <MenuItem value="FiberS3">Fiber S3</MenuItem>
              <MenuItem value="FiberS4">Fiber S4</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <TextField
            id="outlined-basic"
            label="Grade"
            variant="outlined"
            value="S1"
            readonly
            sx={{ fontSize: "18px", width: "200px" }}
          />
        </Grid>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid>
        <Grid>
          <Grid mb={4}>
            <Typography
              mb={2}
              variant="h5"
              component="h5"
              className="item-labels"
              sx={{ fontSize: "12px", color: "#aaa" }}
            >
              Specify the weight in kilogram:
            </Typography>
            <TextField
              id="outlined-basic"
              label="Weight (kg)"
              variant="outlined"
              sx={{ fontSize: "18px", width: "200px" }}
            />
          </Grid>
          <Grid>
            <TextField
              id="outlined-basic"
              label="Original Price"
              variant="outlined"
              value="10.01"
              readonly
              sx={{ fontSize: "18px", width: "200px" }}
            />
          </Grid>
          <Grid sx={{ textAlign: "center" }}>
            <MDButton
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
            mb={2}
            variant="h5"
            component="h5"
            className="item-labels"
            sx={{ fontSize: "12px", color: "#aaa" }}
          >
            Total Amount:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Total"
            variant="outlined"
            value="500.50"
            sx={{ fontSize: "18px", width: "200px" }}
            readonly
          />
        </Grid>

        <Divider sx={{ marginY: "52px" }} />
        <Grid>
          <MDButton
            variant="contained"
            color="success"
            className="add-btn"
            sx={{
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

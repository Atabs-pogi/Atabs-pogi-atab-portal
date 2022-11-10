import React from "react";
import Divider from "@mui/material/Divider";
import { Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import "./style.css";

function ProductConfig() {
  return (
    <MDBox
      px={2}
      className="item-process"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid sx={{ width: "50vh" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Fiber Name"
                  variant="outlined"
                  value="Abaca"
                  readonly
                  sx={{ fontSize: "17px", width: "200px" }}
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
            </Grid>

            <Divider />

            <Grid>
              <Grid>
                <Typography
                  mb={1}
                  variant="h5"
                  component="h5"
                  className="item-labels"
                  sx={{ fontSize: "12px", color: "#bbb" }}
                >
                  Specify the weight in kilogram:
                </Typography>
                <Grid sx={{ display: "flex", justifyContent: "space-between", width: "94%" }}>
                  <Grid>
                    <TextField
                      id="outlined-basic"
                      label="Weight (kg)"
                      variant="outlined"
                      sx={{ fontSize: "18px", width: "200px" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Divider />

              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Total"
                  variant="outlined"
                  value="500.50"
                  sx={{ fontSize: "18px", width: "200px" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="grid-btns"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25vh",
              marginLeft: "5vh",
              width: "30vh",
            }}
          >
            <MDButton variant="contained" color="success" className="compute-btn">
              Calculate
            </MDButton>
            <MDButton variant="contained" color="success" className="add-btn" sx={{ ml: 2 }}>
              <AddIcon sx={{ mr: 1 }} />
              Add to Table
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default ProductConfig;

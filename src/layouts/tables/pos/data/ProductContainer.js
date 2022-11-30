import React from "react";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

import MDBox from "components/MDBox";

// import fiberservice from "../../../../services/fiber-services";

export default function ProductContainer() {
  function createRow(name, origprc) {
    return { name, origprc };
  }

  const items = [
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
    createRow("Abaca", 10.01),
    createRow("Tuxy", 10),
    createRow("Fiber", 2),
  ];

  return (
    <MDBox
      className="product-container"
      sx={{
        backgroundColor: "#fff",
        minHeight: "fit-content",
        height: "inherit",
        width: "21vw",
        borderRadius: "20px",
        marginRight: "30px",
      }}
    >
      <MDBox>
        <Grid container mt={2} px={3}>
          <Grid
            className="container-label"
            item
            xs={5}
            sx={{
              p: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                marginTop: "10px",
              }}
              gutterBottom
            >
              Fibers
            </Typography>
          </Grid>
          <Grid
            className="searchbox"
            item
            xs={7}
            sx={{
              textAlign: "right",
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
        </Grid>
      </MDBox>
      <MDBox>
        <MDBox
          mx={4}
          my={2}
          sx={{
            display: "block",
            height: "33vw",
            textAlign: "center",
            border: "solid 1px #ccc",
            overflowY: "scroll",
          }}
          className="products-container"
        >
          {items.map((item) => (
            <MDBox className="item-container">
              <MDBox
                key={item.name}
                className="product-info"
                sx={{
                  fontSize: "15px",
                  padding: "10px 50px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" component="p">
                  {item.name}
                </Typography>
                <Typography variant="p" component="p">
                  P{item.origprc}
                </Typography>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

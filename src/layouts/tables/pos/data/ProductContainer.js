import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

import MDBox from "components/MDBox";

export default function BasicCard() {
  function createRow(name, origprc) {
    return { name, origprc };
  }

  const items = [createRow("Abaca", 10.01), createRow("Tuxy", 10), createRow("Fiber", 2)];

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        minHeight: "fit-content",
        height: "inherit",
        width: "20vw",
        borderRadius: "20px",
        marginRight: "30px",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              p: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                marginTop: "10px",
              }}
              gutterBottom
            >
              Tuxy Fibers
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
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
      </CardContent>
      <CardContent>
        <MDBox
          sx={{
            display: "block",
            height: "32vw",
            textAlign: "center",
            border: "solid 1px #ccc",
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
      </CardContent>
    </Card>
  );
}

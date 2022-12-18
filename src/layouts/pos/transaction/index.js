import React from "react";
import { v4 as uuid } from "uuid";
import { Card, CardActions, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TransactionCart, { getUnitPrice } from "./cart";
import ItemModal from "./item-add-modal";

export default function TransactionPage() {
  const [itemOpen, setItemOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [payment, setPayment] = React.useState(null);

  const handleChange = (item) => {
    const index = items?.findIndex((p) => p?.id === item?.id);
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const totalPrice =
    items?.reduce((val, item) => {
      const subTotal = getUnitPrice(item) * (item?.quantity || 0);
      return val + subTotal;
    }, 0) || 0;

  const handleAdd = () => {
    setItemOpen(true);
  };

  const handleItemClose = () => {
    setItemOpen(false);
  };

  const handleItemSave = () => {
    console.log("Qwe");
  };

  const handleItemAdd = (item) => {
    setItems([
      ...items,
      {
        ...item,
        id: uuid(),
        quality: "Good",
        quantity: 1,
      },
    ]);
  };

  const handleItemRemove = (item) => {
    setItems(items?.filter((i) => i?.id !== item?.id));
  };

  const handlePayment = (evt) => {
    setPayment(evt?.target?.value);
  };

  // React.useEffect(() => {
  //   console.log(items);
  // }, [items]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ItemModal
        open={itemOpen}
        onClose={handleItemClose}
        onSave={handleItemSave}
        items={items}
        onItemAdd={handleItemAdd}
      />
      <MDBox pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDButton variant="contained" color="success" size="sm" onClick={handleAdd}>
              <AddIcon sx={{ mr: 1 }} />
              Add Item
            </MDButton>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "-40px" }}>
            <Card>
              <TransactionCart
                items={items}
                onChange={handleChange}
                onItemRemove={handleItemRemove}
              />
              <MDBox sx={{ textAlign: "right" }}>
                <MDBox>
                  <TextField
                    label="Total"
                    value={totalPrice}
                    readOnly
                    variant="outlined"
                    sx={{ m: 1, mt: 2 }}
                  />
                </MDBox>
                <MDBox>
                  <TextField
                    label="Payment"
                    value={payment}
                    variant="outlined"
                    type="number"
                    onChange={handlePayment}
                    sx={{ m: 1 }}
                  />
                </MDBox>
                <MDBox>
                  <TextField
                    label="Change"
                    value={payment - totalPrice}
                    readOnly
                    variant="outlined"
                    sx={{ m: 1 }}
                  />
                </MDBox>
              </MDBox>
              <CardActions sx={{ justifyContent: "right" }}>
                <MDBox>
                  <MDButton
                    variant="contained"
                    color="info"
                    size="sm"
                    disabled={payment - totalPrice < 0 || totalPrice === 0}
                  >
                    Checkout
                  </MDButton>
                </MDBox>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

import React from "react";
import { v4 as uuid } from "uuid";
import { Card, CardActions, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SearchIcon from "@mui/icons-material/Search";
import TransactionCart, { getUnitTotal } from "./cart";
import ItemModal from "./item-add-modal";
import CheckoutModal from "./checkout-modal";
import SummaryModal from "./summary-modal";
import FarmerModal from "./select-farmer-modal";

export default function TransactionPage() {
  const [itemOpen, setItemOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [transId, setTransId] = React.useState(null);
  const [farmerOpen, setFarmerOpen] = React.useState(false);
  const [farmer, setFarmer] = React.useState(null);

  const handleChange = (item) => {
    const index = items?.findIndex((p) => p?.id === item?.id);
    const newItems = [...items];
    newItems[index] = item;
    setItems(newItems);
  };

  const totalPrice = items?.reduce((val, item) => val + getUnitTotal(item), 0) || 0;

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

  const handleConfirmAdd = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const onSuccessConfirm = (id) => {
    setConfirmOpen(false);
    setTransId(id);
    setItems([]);
  };

  const handleCloseSummary = () => {
    setTransId(null);
  };

  const handleItemRemove = (item) => {
    setItems(items?.filter((i) => i?.id !== item?.id));
  };

  const handleSelectFarmer = () => {
    setFarmerOpen(true);
  };

  const handleCloseFarmer = () => {
    setFarmerOpen(false);
  };

  const handleFarmer = (f) => {
    setFarmer(f);
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
      <CheckoutModal
        open={confirmOpen}
        onClose={handleConfirmClose}
        items={items}
        onSuccess={onSuccessConfirm}
        farmer={farmer}
      />
      <SummaryModal open={!!transId} onClose={handleCloseSummary} transId={transId} />
      <FarmerModal
        open={farmerOpen}
        onClose={handleCloseFarmer}
        farmer={farmer}
        onFarmerSelect={handleFarmer}
      />
      <MDBox pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDButton
              variant="contained"
              color="success"
              size="sm"
              onClick={handleAdd}
              sx={{ mr: 2 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Item
            </MDButton>
            <MDButton
              variant="contained"
              color="success"
              size="sm"
              onClick={handleSelectFarmer}
              sx={{ mr: 2 }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              Select Farmer
            </MDButton>
            <TextField
              label="Farmer Name"
              value={
                farmer?.id
                  ? `${farmer?.firstName} ${farmer?.middleName} ${farmer?.lastName}`
                  : "No farmer selected"
              }
              readOnly
            />
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
              </MDBox>
              <CardActions sx={{ justifyContent: "right" }}>
                <MDBox>
                  <MDButton
                    variant="contained"
                    color="info"
                    size="sm"
                    disabled={totalPrice === 0}
                    onClick={handleConfirmAdd}
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

import React from "react";
import Modal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import merchantImg from "assets/images/small-logos/merchant.jpg";
import merchantService from "services/merchant-prod-service";

export default function MerchantProdUpdateModal({ selected, open, onClose, onSuccess }) {
  const [merchantProd, setMerchantProd] = React.useState({ ...selected });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newMerchantProd = {
      ...merchantProd,
    };
    merchantService
      .updateMerchProd(newMerchantProd)
      .then(() => {
        setMerchantProd({});
        onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (merchantProd?.quantity < merchantProd?.minimumStock) {
      alert("Minimum Stock shouldn't be larger than quantity");
      merchantProd.quantity = "";
      merchantProd.minimumStock = "";
    }
  }, [merchantProd?.quantity, merchantProd?.minimumStock]);

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh", maxHeight: "100vh", overflowX: "auto" }}
        >
          <Grid item xs={6}>
            <Card sx={{ width: "180vh", height: "95vh", flexDirection: "row", display: "flex" }}>
              <MDBox
                component="img"
                src={merchantImg}
                alt="Logo"
                height="100%"
                width="20%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                  mr: 7,
                }}
              />
              <MDBox sx={{ flexGrow: 1 }}>
                <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                    <IconButton>
                      <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </MDBox>
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Merchant Product Information ({merchantProd?.id})
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ width: "90%" }}>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Category"
                          name="productCategory"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          disabled={loading}
                          defaultValue={merchantProd?.productCategory}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, productCategory: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          name="productName"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          disabled={loading}
                          defaultValue={merchantProd?.productName}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, productName: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Unit"
                          name="unit"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          disabled={loading}
                          defaultValue={merchantProd?.unit}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, unit: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Unit Price"
                          name="unitPrice"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          defaultValue={merchantProd?.unitPrice}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, unitPrice: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Quantity"
                          name="quantity"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          disabled={loading}
                          defaultValue={merchantProd?.quantity}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, quantity: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Cost Price"
                          name="costPrice"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          defaultValue={merchantProd?.costPrice}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, costPrice: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Minimum Stock"
                          name="minimumStock"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          defaultValue={merchantProd?.minimumStock}
                          onChange={(evt) =>
                            setMerchantProd({ ...merchantProd, minimumStock: evt.target.value })
                          }
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          id="outlined-basic"
                          label="Original Price"
                          name="originalPrice"
                          type="number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 4, width: "70%" }}
                          value={merchantProd?.originalPrice}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {/* ERROR MESSAGE */}
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleSave}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                      >
                        Save
                      </MDButton>
                      <MDButton
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                        onClick={handleClose}
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  );
}

MerchantProdUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
MerchantProdUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

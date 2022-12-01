import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import posImg from "assets/images/small-logos/pos.jpg";
import PosItem from "./viewing";

export default function PosUpdateModal({ open, onClose, info }) {
  const { items, farmerId, id } = info || {};
  const handleClose = () => {
    onClose?.();
  };

  const totalPrice =
    items?.reduce((val, item) => {
      const subTotal = (item?.plantPrice || 0) * (item?.plantKilogram || 0);
      return val + subTotal;
    }, 0) || 0;

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
                src={posImg}
                alt="Logo"
                height="100%"
                width="20%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                }}
              />
              <MDBox sx={{ flexGrow: 1 }}>
                <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                    <IconButton>
                      <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </MDBox>
                  <MDBox sx={{ px: 7 }}>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Pos Information
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1, px: 7 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          name="id"
                          label="Transaction ID"
                          readOnly
                          value={id}
                          variant="outlined"
                          sx={{ pr: 25, mb: 5 }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          name="farmerId"
                          label="Farmer ID"
                          readOnly
                          value={farmerId}
                          variant="outlined"
                          sx={{ pr: 25, mb: 5 }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                          Items
                        </Typography>
                        <Box
                          sx={{
                            maxHeight: "250px",
                            height: "250px",
                            overflowY: "auto",
                            py: 1,
                            mb: 4,
                          }}
                        >
                          {items?.map((item) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <PosItem key={item?.id} info={item} />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={9} />
                      <Grid item xs={3}>
                        <TextField
                          id="outlined-basic"
                          name="totalPrice"
                          label="Total Price"
                          readOnly
                          value={totalPrice}
                          variant="outlined"
                          type="number"
                          sx={{ pr: 7 }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2, mt: 2, width: 80 }}
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

PosUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  info: {},
};
// Typechecking props of the MDAlert
PosUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  info: PropTypes.object,
};

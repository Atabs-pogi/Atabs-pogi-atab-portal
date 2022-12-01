import React from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "@mui/material/Modal";
import { Box, Button, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import posImg from "assets/images/small-logos/pos.jpg";
import posService from "services/pos-service";
import { useFormik } from "formik";
import PosSchema, { initialPos } from "../schema/pos-schema";
import PosItem from "./item";

export default function PosModal({ open, onClose, onSuccess }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [items, setItems] = React.useState([{ id: uuidv4() }]);
  const handleClose = () => {
    onClose?.();
  };

  React.useEffect(() => {
    console.log(items);
  }, [items]);

  const formik = useFormik({
    initialValues: initialPos,

    validationSchema: PosSchema,
    onSubmit: () => {
      setError("");
      setLoading(true);
      posService
        .addPos(formik.values)
        .then(() => {
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleClick = () => {
    setItems?.([...items, { id: uuidv4() }]);
  };

  const handleItemChange = (item) => {
    const newItems = [...items];
    const index = newItems.findIndex((i) => i?.id === item?.id);
    newItems[index] = item;
    setItems(newItems);
  };

  const totalPrice =
    items?.reduce((val, item) => {
      const subTotal =
        (item?.fiber?.prices?.find((price) => price?.grade === item?.grade)?.price || 0) *
        (item?.kilo || 0);
      return val + subTotal;
    }, 0) || 0;

  const handleItemDelete = (item) => {
    setItems(items.filter((i) => i?.id !== item?.id));
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-basic"
                            name="farmerId"
                            label="Farmer ID"
                            // disabled={loading}
                            // value={formik.values.farmerId}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBLur}
                            // error={formik.touched.farmerId && Boolean(formik.errors.farmerId)}
                            // helperText={formik.touched.farmerId && formik.errors.farmerId}
                            variant="outlined"
                            sx={{ pr: 7, width: "33.27%", mb: 5 }}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                            Items <Button onClick={handleClick}>Add</Button>
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
                            {items?.map((item, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <PosItem
                                key={item?.id}
                                info={item}
                                onDelete={handleItemDelete}
                                onChange={handleItemChange}
                                allowDelete={items?.length > 1}
                                autoFocus={index + 1 === items?.length}
                              />
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
                    {error}
                    {open && (
                      <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                        <MDButton
                          type="submit"
                          variant="contained"
                          color="success"
                          sx={{ mr: 2, mt: 2, width: 80 }}
                        >
                          Save
                        </MDButton>
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
        </form>
      </MDBox>
    </Modal>
  );
}

PosModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
PosModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

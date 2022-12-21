import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import farmerImg from "assets/images/small-logos/farmer.jpg";
import farmerService from "services/farmer-service";
import SelectSex from "../../textfields/select-sex";
import TextFieldDatePicker from "../../textfields/date-picker";

export default function FarmerUpdateModal({ selected, open, onClose, onSuccess }) {
  const { address: selectedAddress, ...selectedFarmer } = selected;
  const [farmer, setFarmer] = React.useState(selectedFarmer);
  const [imagePath, setImgPath] = React.useState("");
  const [image, setImg] = React.useState("");
  const [address, setAddress] = React.useState(selectedAddress);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };

  function handleImage(e) {
    console.log(e.target.files[0]);
    farmerService
      .createImgPath("Matthew", "Farmer", e.target.files[0])
      .then((res) => {
        setImgPath(res.data);
        // onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
  }
  console.log(image);
  console.log(imagePath);
  console.log(farmer);

  const handleSave = () => {
    setError("");
    setLoading(true);
    const newFarmer = {
      ...farmer,
      address,
    };
    farmerService
      .updateFarmer(newFarmer)
      .then(() => {
        setAddress({});
        setFarmer({});
        onSuccess?.();
      })
      .catch((err) => {
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
                src={farmerImg}
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
                      Farmer Information ({farmer?.id})
                    </Typography>
                  </MDBox>
                  <MDBox
                    sx={{
                      display: "flex",
                      mb: 2,
                    }}
                  >
                    <MDBox>
                      <MDBox
                        src={image}
                        component="img"
                        alt=""
                        sx={{
                          border: "solid 1px #aaa",
                          padding: "20",
                          height: "230px",
                          width: "230px",
                          margin: "auto",
                          mb: 2,
                        }}
                      />
                      <MDBox
                        className="upload-btn"
                        mx={2}
                        sx={{
                          textAlign: "center",
                          padding: "8px 0",
                          backgroundColor: "#252525",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          variant="label"
                          component="label"
                          htmlFor="farmerimg"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            fontSize: "small",
                            color: "#fff",
                          }}
                        >
                          <UploadIcon sx={{ mr: 1 }} />
                          Upload an Image
                        </Typography>
                      </MDBox>
                      <input
                        id="farmerimg"
                        type="file"
                        name="imgUpload"
                        onChange={handleImage}
                        sx={{ display: "none" }}
                      />
                      <Grid item>
                        <TextField
                          id="outlined-basic"
                          label="Image Location"
                          variant="outlined"
                          fullWidth
                          sx={{ textAlign: "center", justifyContent: "center", mt: 2 }}
                          value={imagePath}
                          onChange={(evt) =>
                            setFarmer({ ...farmer, imageLocation: evt.target.value })
                          }
                        />
                      </Grid>
                    </MDBox>

                    <MDBox className="modal-content" sx={{ flexGrow: 1, ml: 4 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            disabled={loading}
                            defaultValue={farmer?.lastName}
                            onChange={(evt) => setFarmer({ ...farmer, lastName: evt.target.value })}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Firstname"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            disabled={loading}
                            defaultValue={farmer?.firstName}
                            onChange={(evt) =>
                              setFarmer({ ...farmer, firstName: evt.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Middlename (Optional)"
                            variant="outlined"
                            fullWidth
                            sx={{ pr: 7 }}
                            defaultValue={farmer?.middleName}
                            onChange={(evt) =>
                              setFarmer({ ...farmer, middleName: evt.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Mobile Number"
                            name="mobileNumber"
                            variant="outlined"
                            fullWidth
                            type="number"
                            sx={{ mt: 2, pr: 7 }}
                            defaultValue={farmer?.mobileNumber}
                            onChange={(evt) =>
                              setFarmer({ ...farmer, mobileNumber: evt.target.value })
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography
                                    variant="h2"
                                    component="span"
                                    sx={{ fontSize: "15px", fontWeight: "400" }}
                                  >
                                    +63
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            id="outlined-basic"
                            label="Email (Required)"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2, pr: 7 }}
                            defaultValue={farmer?.email}
                            onChange={(evt) => setFarmer({ ...farmer, email: evt.target.value })}
                          />
                        </Grid>
                        <Grid item xs={4} mt={2}>
                          <SelectSex
                            name="sex"
                            value={farmer?.sex}
                            onChange={(evt) => setFarmer({ ...farmer, sex: evt.target.value })}
                          />
                        </Grid>
                        <Grid item xs={4} mt={2}>
                          <TextFieldDatePicker
                            name="birthday"
                            value={farmer?.birthday}
                            onChange={(evt) => setFarmer({ ...farmer, birthday: evt })}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                      Farmer Address
                    </Typography>
                  </MDBox>
                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="House no."
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.houseNo}
                          onChange={(evt) => setAddress({ ...address, houseNo: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Unit"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.unit}
                          onChange={(evt) => setAddress({ ...address, unit: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Barangay"
                          variant="outlined"
                          fullWidth
                          sx={{ pr: 7 }}
                          defaultValue={address?.barangay}
                          onChange={(evt) => setAddress({ ...address, barangay: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="City"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={address?.city}
                          onChange={(evt) => setAddress({ ...address, city: evt.target.value })}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Province"
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2, pr: 7 }}
                          defaultValue={address?.province}
                          onChange={(evt) => setAddress({ ...address, province: evt.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
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

FarmerUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  selected: null,
  onSuccess: () => {},
};
// Typechecking props of the MDAlert
FarmerUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
  onSuccess: PropTypes.func,
};

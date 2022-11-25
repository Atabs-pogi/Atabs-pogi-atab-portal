import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Grid,
  IconButton,
  // eslint-disable-next-line no-unused-vars
} from "@mui/material";
import PropTypes from "prop-types";
// import employeeImg from "assets/images/small-logos/image1.png";
// import MDTypography from "components/MDTypography";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import TransactionDetails from "../cashier-data/TransactionDetails";
// import TextFieldDatePicker from "../../admin/textfields/date-picker";
// import TextFieldDatePicker from "../textfields/date-picker";
// import SelectSex from "../textfields/select-sex";
// import SelectRole from "../textfields/select-role";

export default function PayrollModal({ open, onClose }) {
  const handleClose = () => {
    onClose?.();
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
            <Card sx={{ width: "125vh", height: "70vh" }}>
              {/* <MDBox
                component="img"
                src={employeeImg}
                alt="Logo"
                height="100%"
                width="20%"
                sx={{
                  borderTopLeftRadius: 11,
                  borderBottomLeftRadius: 11,
                  mr: 7,
                }}
              /> */}
              <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                <IconButton>
                  <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                </IconButton>
              </MDBox>
              <MDBox sx={{ flexGrow: 1, padding: "10px 30px" }}>
                <TransactionDetails />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  );
}

PayrollModal.defaultProps = {
  open: false,
  onClose: () => {},
  // selected: null,
};
// Typechecking props of the MDAlert
PayrollModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  // selected: PropTypes.object,
};

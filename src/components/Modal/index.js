import React from "react";
import MuiModal from "@mui/material/Modal";
import { Card, Divider, Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({
  open,
  onClose,
  onSave,
  picture,
  title,
  children,
  error,
  disabled,
  noCancel,
  saveText,
}) {
  const handleClose = () => {
    onClose?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  return (
    <MuiModal
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
                src={picture}
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
                      <CloseIcon
                        color="error"
                        disabled={disabled}
                        onClick={handleClose}
                        sx={{ cursor: "pointer" }}
                      />
                    </IconButton>
                  </MDBox>
                  <MDBox sx={{ px: 7, flexGrow: 1 }}>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                        {title}
                      </Typography>
                    </MDBox>
                    <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                      {children}
                    </MDBox>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  <MDBox>
                    {/* ERROR MESSAGE */}
                    {error}
                  </MDBox>
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleSave}
                        variant="contained"
                        color="success"
                        sx={{ mr: 2, mt: 5, width: 80 }}
                        disabled={disabled}
                      >
                        {saveText || "Save"}
                      </MDButton>
                      {!noCancel && (
                        <MDButton
                          variant="contained"
                          color="secondary"
                          sx={{ mr: 2, mt: 5, width: 80 }}
                          onClick={handleClose}
                          disabled={disabled}
                        >
                          Cancel
                        </MDButton>
                      )}
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MuiModal>
  );
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  onSave: () => {},
  picture: null,
  title: "",
  error: null,
  disabled: false,
  noCancel: false,
  saveText: "",
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  picture: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  noCancel: PropTypes.bool,
  saveText: PropTypes.string,
};

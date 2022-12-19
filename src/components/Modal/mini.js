import React from "react";
import MuiModal from "@mui/material/Modal";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";

export default function MiniModal({ open, onClose, title, children }) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <MuiModal
      keepMounted
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <MDBox>
        <Grid container spacing={0} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Card
              sx={{
                maxWidth: "500px",
                width: "100%",
                maxHeight: "300px",
                height: "40vh",
                marginTop: "25vh",
              }}
            >
              <MDBox sx={{ flexGrow: 1 }}>
                <MDBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <MDBox className="modal-header" sx={{ textAlign: "right", fontSize: "25px" }}>
                    <IconButton>
                      <CloseIcon color="error" onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </MDBox>
                  <MDBox sx={{ px: 7, flexGrow: 1 }}>
                    <MDBox>
                      <Typography variant="h3" component="h2" sx={{ fontSize: 18, my: 3 }}>
                        {title}
                      </Typography>
                    </MDBox>
                    <MDBox
                      className="modal-content"
                      sx={{ flexGrow: 1, position: "relative", height: "100%" }}
                    >
                      {children}
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MuiModal>
  );
}

MiniModal.defaultProps = {
  open: false,
  onClose: () => {},
  title: "",
};

MiniModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

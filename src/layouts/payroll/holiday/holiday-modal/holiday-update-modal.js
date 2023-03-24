/* eslint-disable no-unused-vars */
import React from "react";
import Modal from "@mui/material/Modal";
import {
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CloseIcon from "@mui/icons-material/Close";
import holidaysService from "services/holidays-service";
import accountImg from "assets/images/small-logos/account.jpg";

function HolidayType({ options, ...props }) {
  return (
    <MDBox>
      <FormControl fullWidth>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" {...props}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </MDBox>
  );
}

HolidayType.defaultProps = {
  options: () => [],
};
// Typechecking props of the MDAlert
HolidayType.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
};

export default function HolidayUpdateModal({ selected, open, onClose, onSuccess }) {
  const { ...event } = selected || {};

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [description, setDescription] = React.useState(event.description);
  const [type, setType] = React.useState(event.type || "0");

  const handleClose = () => {
    onClose?.();
  };

  const options = [
    { label: "Regular", value: "0" },
    { label: "Special", value: "1" },
  ];

  React.useEffect(() => {
    if (selected) {
      setDescription(event.description);
      setType(selected.type || "0");
    }
  }, [selected]);

  const handleUpdateEvent = () => {
    const params = {
      id: selected.id,
      date: selected.date,
      type,
      description,
    };

    holidaysService
      .updateHoliday(params)
      .then((e) => {
        if (e === "Holiday Already Exist") {
          // eslint-disable-next-line no-alert
          alert(e);
        }
        onSuccess();
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
                src={accountImg}
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
                      Update Event
                    </Typography>
                  </MDBox>

                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} sx={{ mt: 4, ml: 4, width: "80%" }}>
                      <Grid item xs={6} mb={4}>
                        <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                          Holiday Description:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} mb={4}>
                        <TextField
                          type="text"
                          variant="outlined"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          disabled={loading}
                          sx={{ width: "25vw" }}
                        />
                      </Grid>
                      <Grid item xs={6} mb={4}>
                        <Typography variant="h3" component="h2" sx={{ mr: 4, fontSize: 17 }}>
                          Holiday Type:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} mb={4}>
                        <HolidayType
                          name="type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          options={options}
                          sx={{ height: "2.3vw", width: "25vw" }}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleUpdateEvent}
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

HolidayUpdateModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
HolidayUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

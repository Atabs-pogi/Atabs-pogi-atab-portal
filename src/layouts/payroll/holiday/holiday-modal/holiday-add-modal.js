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
import DatePicker from "../../../tables/employee/admin/textfields/date-picker";

function HolidayType({ ...props }) {
  return (
    <MDBox>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Holiday Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Holiday Type"
          {...props}
        >
          <MenuItem value={0}>Regular</MenuItem>
          <MenuItem value={1}>Special</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

export default function HolidayModal({ selected, open, onClose, onSuccess }) {
  const [newEvent, setNewEvent] = React.useState({ description: "", date: "", type: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClose = () => {
    onClose?.();
  };

  const { ...allEvents } = selected || {};

  const handleAddEvent = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        // eslint-disable-next-line no-alert
        alert("Note: Events are Overlapping");
      }
    }

    if (
      newEvent.description !== "" &&
      newEvent.start !== "" &&
      newEvent.end !== "" &&
      newEvent.type !== ""
    ) {
      console.log(newEvent);
      setError("");
      setLoading(true);

      holidaysService
        .addHoliday(newEvent)
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
    } else {
      // eslint-disable-next-line no-alert
      alert("Some fields are not specified");
    }
  };

  const handleDate = (evt) => {
    const month = String(evt.$M + 1).padStart(2, "0");
    const day = String(evt.$D).padStart(2, "0");
    const date = `${evt.$y}-${month}-${day}`;
    setNewEvent({ ...newEvent, date });
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
                      Add new event
                    </Typography>
                  </MDBox>

                  <MDBox className="modal-content" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                      <Grid item xs={12} mt={4} pr={7}>
                        <TextField
                          type="text"
                          label="Event Description"
                          value={newEvent.description}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, description: e.target.value })
                          }
                          disabled={loading}
                          sx={{ width: "25vw" }}
                        />
                      </Grid>
                      <Grid item xs={12} mt={4} pr={7}>
                        <HolidayType
                          name="type"
                          value={newEvent.type}
                          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                          sx={{ height: "2.3vw", width: "25vw" }}
                        />
                      </Grid>
                      <Grid item xs={12} mt={4} pr={7}>
                        <Grid sx={{ width: "25vw" }}>
                          <DatePicker
                            label="Date"
                            value={newEvent.date}
                            onChange={handleDate}
                            format="MM/DD/YYYY"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </MDBox>
                  <Divider sx={{ py: 0.1, opacity: 10 }} />
                  {error}
                  {open && (
                    <MDBox className="modal-action" sx={{ textAlign: "right", height: 100 }}>
                      <MDButton
                        onClick={handleAddEvent}
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

HolidayModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSuccess: () => {},
  selected: null,
};
// Typechecking props of the MDAlert
HolidayModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selected: PropTypes.object,
};

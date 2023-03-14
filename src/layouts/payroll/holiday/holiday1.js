import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import holidaysService from "services/holidays-service";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DatePicker from "../../tables/employee/admin/textfields/date-picker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": import("date-fns/locale/en-US").then((locale) => locale),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
          <MenuItem value="0">Regular</MenuItem>
          <MenuItem value="1">Special</MenuItem>
          <MenuItem value="2">Legal</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

function CalendarScheduler() {
  const [newEvent, setNewEvent] = React.useState({ description: "", date: "", type: "" });
  const [allEvents, setAllEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleHolidays = async () => {
    try {
      setLoading(true);
      const holidays = await holidaysService.getHolidays();

      const events = holidays.map((holiday) => {
        const endDate = new Date(holiday.date);
        endDate.setDate(endDate.getDate() + 1);
        const month = endDate.getMonth().toString().padStart(2, "0");
        const date = endDate.getDate().toString().padStart(2, "0");
        const year = endDate.getFullYear().toString();

        return {
          id: holiday.id,
          title: holiday.description,
          start: new Date(holiday.date),
          end: new Date(year, month, date),
          type: holiday.type,
        };
      });

      setAllEvents(events);
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

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

      holidaysService
        .addHoliday(newEvent)
        .then((e) => {
          if (e === "Holiday Already Exist") {
            // eslint-disable-next-line no-alert
            alert(e);
          }
          handleHolidays();
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

  React.useEffect(() => {
    handleHolidays();
  }, []);

  return (
    <MDBox>
      <MDBox>
        <Typography variant="h4" sx={{ textAlign: "center", padding: 3, fontWeight: 600 }}>
          Add new event
        </Typography>
        <Grid sx={{ textAlign: "center" }}>
          <Grid>
            <TextField
              type="text"
              label="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              sx={{ width: "20vw" }}
            />
          </Grid>
          <Grid sx={{ width: "15vw", marginX: "auto", mt: 2 }}>
            <HolidayType
              name="report"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              sx={{ height: "2.3vw" }}
            />
          </Grid>
          <Grid sx={{ margin: "auto", mt: 2, width: "15vw" }}>
            <DatePicker
              label="Date"
              value={newEvent.date}
              onChange={handleDate}
              format="MM/DD/YYYY"
            />
          </Grid>

          <Grid>
            <MDButton
              className="btn"
              variant="contained"
              onClick={handleAddEvent}
              color="success"
              sx={{ mt: 4 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Event
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        loading={loading}
        onSelectEvent={(evt) => console.log(evt.id)}
      />
      {error}
    </MDBox>
  );
}

export default CalendarScheduler;

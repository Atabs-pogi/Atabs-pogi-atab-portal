import React from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Grid } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import holidaysService from "services/holidays-service";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import HolidayModal from "./holiday-modal/holiday-add-modal";
import HolidayUpdateModal from "./holiday-modal/holiday-update-modal";

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

function CalendarScheduler() {
  const [allEvents, setAllEvents] = React.useState([]);
  const [selectedEvent, setEvent] = React.useState([]);
  const [eventUpdate, setEventUpdate] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleUpdateOpen = () => {
    holidaysService.getHoliday(selectedEvent).then((res) => {
      setEventUpdate(res);
      setUpdateOpen(true);
    });
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleEventDelete = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm("Are you sure you want to delete this event?")) {
      setError("");
      setLoading(true);
      holidaysService
        .deleteHoliday(selectedEvent)
        .then(() => {
          handleHolidays();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleHolidays();
    }
  };

  React.useEffect(() => {
    handleHolidays();
  }, []);

  return (
    <MDBox>
      <HolidayModal
        open={open}
        onClose={handleClose}
        selected={allEvents}
        onSuccess={() => {
          setOpen(false);
          handleHolidays();
        }}
      />
      <HolidayUpdateModal
        open={selectedEvent.length !== 0 && updateOpen}
        onClose={handleUpdateClose}
        selected={eventUpdate}
        onSuccess={() => {
          setUpdateOpen(false);
          handleHolidays();
        }}
      />
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }}>
          <MDButton variant="contained" onClick={handleOpen} color="success" sx={{ ml: 4 }}>
            <AddIcon sx={{ mr: 1 }} />
            Add Event
          </MDButton>
          <MDButton
            variant="contained"
            onClick={handleUpdateOpen}
            color="success"
            disabled={selectedEvent.length === 0}
            sx={{ ml: 2 }}
          >
            <EditIcon sx={{ mr: 1 }} />
            Edit Event
          </MDButton>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end", p: 1 }}>
          <MDButton
            variant="contained"
            onClick={handleEventDelete}
            color="error"
            disabled={selectedEvent.length === 0}
            sx={{ mr: 4 }}
          >
            <EditIcon sx={{ mr: 1 }} />
            Delete Event
          </MDButton>
        </Grid>
      </Grid>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, marginInline: "50px", marginBottom: "50px", marginTop: "40px" }}
        disabled={loading}
        onSelectEvent={(evt) => setEvent(evt.id)}
      />
      {error}
    </MDBox>
  );
}

export default CalendarScheduler;

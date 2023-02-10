import React from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldDatePicker from "layouts/tables/employee/admin/textfields/date-picker";

function HolidayType({ ...props }) {
  return (
    <MDBox>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Holiday Type</InputLabel>
        <Select sx={{ py: 1.5 }} {...props}>
          <MenuItem value="working">Working</MenuItem>
          <MenuItem value="non-working">Non-Working</MenuItem>
        </Select>
      </FormControl>
    </MDBox>
  );
}

export default function Holiday() {
  const [items, setItems] = React.useState([{ id: uuidv4() }]);

  const handleAdd = () => {
    setItems?.([...items, { id: uuidv4() }]);
  };

  const handleItemDelete = (item) => () => {
    setItems(items.filter((i) => i?.id !== item?.id));
  };

  return (
    <MDBox>
      <TableContainer component={Paper} elevation={4} sx={{ height: "75vh", p: 2 }}>
        <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
              <TableCell>
                Holiday
                <IconButton variant="contained" color="info" onClick={handleAdd}>
                  <AddCircleIcon fontSize="large" color="success" sx={{ pl: 0 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map?.((item) => (
              <TableRow key={item?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <IconButton
                    variant="contained"
                    color="info"
                    onClick={handleItemDelete(item)}
                    sx={{ mr: 2 }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <TextFieldDatePicker
                    label="Date of Holiday"
                    txprops={{ sx: { width: 250, mx: 2 } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField label="Holiday Name" sx={{ width: 250 }} />
                </TableCell>
                <TableCell>
                  <HolidayType
                    label="Holiday Type"
                    variant="outlined"
                    sx={{ width: 250, py: 1.5 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <MDBox mt={2} p={2} sx={{ textAlign: "right" }}>
          <MDButton variant="contained" color="success">
            SAVE
          </MDButton>
        </MDBox>
      </TableContainer>
    </MDBox>
  );
}

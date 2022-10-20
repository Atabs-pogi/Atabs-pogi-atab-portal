import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FarmerUpdateModal from "../modal/farmers-update-modal";
import FiberUpdateModal from "../modal/fiber-update-modal";

const rows = [
  {
    id: 1,
    name: "Kalbo",
    grade: "Jude",
    price: "Panot",
  },
  {
    id: 2,
    name: "Hernandez",
    grade: "Ray",
    price: "Wang od",
  },
  {
    id: 3,
    name: "Villanueva",
    grade: "Christian",
    price: "Reid",
  },
  {
    id: 4,
    name: "Romera",
    grade: "Mattcha",
    price: "Pokwan",
  },
  {
    id: 5,
    name: "Ancajas",
    firstName: "Jc",
    grade: "Padilla",
    price: "10/20/2000",
  },
];

export default function FiberData() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = React.useState(null);
  const UpdateHandleClose = () => setSelected(null);
  const columns = React.useMemo(() => [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 130 },
    { field: "grade", headerName: "Grade", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setSelected(params)}
          label="Update"
        />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        <FarmerUpdateModal
          open={params.id === selected?.id}
          onClose={UpdateHandleClose}
          selected={params}
        />,
      ],
    },
  ]);

  return (
    <MDBox>
      <FiberUpdateModal open={open} onClose={handleClose} />
      <Grid container>
        <Grid item xs={6} sx={{ p: 1 }}>
          <MDButton variant="contained" onClick={handleOpen} color="success" sx={{ ml: 2 }}>
            <AddIcon sx={{ mr: 1 }} />
            add
          </MDButton>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <TextField
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ my: 1, mx: 1 }}
          />
        </Grid>
      </Grid>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[1]} />
      </div>
    </MDBox>
  );
}

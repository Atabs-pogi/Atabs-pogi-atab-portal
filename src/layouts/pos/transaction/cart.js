import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { MenuItem, Select, TextField } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

export const getUnitPrice = (item) =>
  ({
    Good: item?.goodPrice,
    Excellent: item?.discartePrice,
  }[item?.quality] || 0);

export default function TransactionCart({ onChange, items, onItemRemove }) {
  const handleChange = React.useCallback(
    (row) => {
      if (row?.quantity > 0) onChange?.(row);
    },
    [onChange]
  );

  const handleItemRemove = (item) => {
    onItemRemove?.(item);
  };

  const columns = React.useMemo(() => [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "quality",
      headerName: "Quality",
      width: 200,
      renderCell: ({ row }) => (
        <Select
          sx={{ minWidth: "100%", minHeight: "85%" }}
          onChange={(evt) => handleChange({ ...row, quality: evt?.target?.value })}
          value={row?.quality}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Excellent">Excellent</MenuItem>
        </Select>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      valueGetter: ({ row }) => getUnitPrice(row),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
      renderCell: ({ row }) => (
        <TextField
          value={row?.quantity}
          onChange={(evt) => handleChange({ ...row, quantity: evt?.target?.value || 1 })}
          type="number"
        />
      ),
    },
    {
      field: "subtotal",
      headerName: "Sub Total",
      width: 200,
      valueGetter: ({ row }) => getUnitPrice(row) * (row?.quantity || 0),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<DeleteIcon onClick={() => handleItemRemove(row)} color="error" />}
          label="Update"
        />,
      ],
    },
  ]);

  return (
    <DataGrid
      rows={items}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[1]}
      sx={{ minHeight: "40vh" }}
    />
  );
}

TransactionCart.defaultProps = {
  onChange: () => {},
  items: [],
  onItemRemove: () => {},
};
// Typechecking props of the MDAlert
TransactionCart.propTypes = {
  onChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  onItemRemove: PropTypes.func,
};

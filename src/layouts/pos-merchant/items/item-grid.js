import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import { Badge } from "@mui/material";

export default function ItemGrid({ items, loading, onItemAdd }) {
  const handleCellClick = ({ row }) => {
    if (row?.count < 1) onItemAdd?.(row);
  };

  console.log(onItemAdd);

  const columns = React.useMemo(() => [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={
            <MDTypography color={row?.count > 0 ? "secondary" : "success"}>
              {row?.count > 0 ? (
                "ADDED"
              ) : (
                <>
                  ADD
                  <Badge badgeContent={row?.count} color="primary" sx={{ marginLeft: 2 }} />
                </>
              )}
            </MDTypography>
          }
          label="Update"
        />,
      ],
    },
    { field: "productName", headerName: "Item", width: 200 },
    { field: "costPrice", headerName: "Price", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ]);

  return (
    <DataGrid
      rows={items}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[1]}
      loading={loading}
      sx={{ minHeight: "55vh" }}
      onCellClick={handleCellClick}
    />
  );
}

ItemGrid.defaultProps = {
  items: [],
  loading: false,
  onItemAdd: () => {},
};

ItemGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  loading: PropTypes.bool,
  onItemAdd: PropTypes.func,
};

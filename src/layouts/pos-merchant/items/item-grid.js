import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import { Badge } from "@mui/material";

export default function ItemGrid({ items, loading, onItemAdd }) {
  const handleCellClick = ({ row }) => {
    if (row?.count < 1) onItemAdd?.(row);
  };

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
    { field: "name", headerName: "Name", width: 200 },
    { field: "discartePrice", headerName: "Excellent", width: 200 },
    { field: "goodPrice", headerName: "Good Quality", width: 200 },
    { field: "resecoPrice", headerName: "Reseco", width: 200 },
  ]);

  return (
    <DataGrid
      getRowId={(row) => row.tuxyId}
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

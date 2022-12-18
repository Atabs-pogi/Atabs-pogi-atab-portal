import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

export default function ItemGrid({ items, loading, onItemAdd }) {
  const handleAdd = (item) => {
    if (!item?.added) onItemAdd?.(item);
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
            <MDTypography
              color={row?.added ? "secondary" : "success"}
              onClick={() => handleAdd(row)}
            >
              {row?.added ? "ADDED" : "ADD"}
            </MDTypography>
          }
          label="Update"
        />,
      ],
    },
    { field: "name", headerName: "Name" },
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

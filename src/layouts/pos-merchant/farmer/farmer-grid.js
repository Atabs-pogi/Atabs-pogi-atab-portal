import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

export default function FarmerGrid({ items, loading, onFarmerSelect }) {
  const handleAdd = (item) => {
    if (!item?.added) onFarmerSelect?.(item);
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
              {row?.added ? "SELECTED" : "SELECT"}
            </MDTypography>
          }
          label="Update"
        />,
      ],
    },
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "middleName", headerName: "Middlename", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
  ]);

  return (
    <DataGrid
      getRowId={(row) => row.farmerId}
      rows={items}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[1]}
      loading={loading}
      sx={{ minHeight: "55vh" }}
    />
  );
}

FarmerGrid.defaultProps = {
  items: [],
  loading: false,
  onFarmerSelect: () => {},
};

FarmerGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
  loading: PropTypes.bool,
  onFarmerSelect: PropTypes.func,
};

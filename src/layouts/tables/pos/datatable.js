import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "components/MDBox";
// import fiberservice from "../../../services/fiber-services";

export default function PayrollData() {
  const [fibers, setFibers] = React.useState([]);

  //   const getFibers = () => {
  //     fiberservice.getFibers().then((e) => setFibers(e));
  //   };

  useEffect(() => {
    fetch("http://localhost:8080/fiber/getFibers")
      .then((response) => response.json())
      .then((json) => setFibers(json));
  }, []);

  console.log(fibers);

  const columns = React.useMemo(() => [
    { field: "id", headerName: "Fiber ID", width: 300 },
    { field: "name", headerName: "Fiber Name", width: 300 },
    { field: "grade", headerName: "Grade", width: 300 },
    { field: "price", headerName: "Price", width: 300 },
  ]);

  return (
    <MDBox>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={fibers} columns={columns} pageSize={10} rowsPerPageOptions={[1]} />
      </div>
    </MDBox>
  );
}

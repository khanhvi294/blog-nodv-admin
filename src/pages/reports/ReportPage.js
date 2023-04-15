import { Avatar, Chip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { useQuery } from "react-query";
import { getAllReportings } from "../../api/adminApi";

const ReportPage = () => {
  const [rows, setRows] = useState([]);

  useQuery("reportings", getAllReportings, {
    onSuccess: (data) => {
      console.log("data", data);

      setRows(data);
    },
  });

  const columns = [
    {
      field: "userId",
      headerName: "UserId Created",
      width: 200,
    },

    {
      field: "type",
      headerName: "Type",
      width: 200,
    },

    {
      field: "objectId",
      headerName: "ObjectId",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label="Go"
            color="success"
            variant="outlined"
            className="w-20 !h-7"
          />
        );
      },
    },

    {
      field: "userIsReportedId",
      headerName: "UserId is Reported",
      width: 300,
    },

    {
      field: "action",
      headerName: "Status",
      width: 270,
      sortable: false,
      renderCell: (params) => {
        return params.row.status ? (
          <Chip
            label="Active"
            color="success"
            variant="outlined"
            className="w-20 !h-7"
          />
        ) : (
          <Chip label="Pending" variant="outlined" className="w-20 !h-7" />
        );
      },
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <DataTable columns={columns} rows={rows} setRows={setRows} />
      </div>
    </div>
  );
};

export default ReportPage;

import { Chip } from "@mui/material";
import React from "react";
import DataTable from "../../components/DataTable";

const PostPage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 350 },
    { field: "title", headerName: "Title", width: 350 },
    { field: "user", headerName: "User", width: 350 },
    {
      field: "status",
      headerName: "Status",
      width: 350,
      renderCell: (params) => {
        return params.row.status ? (
          <Chip
            label="Active"
            color="success"
            variant="outlined"
            className="w-20 !h-7"
          />
        ) : (
          <Chip label="Lock" variant="outlined" className="w-20 !h-7" />
        );
      },
    },
  ];
  let rows = [
    {
      id: 1,
      title:
        "Simple ways to improve your React app performance without useMemo.",
      user: "Minh Nhật",
      status: true,
    },
  ];
  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default PostPage;

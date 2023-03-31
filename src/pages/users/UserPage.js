import { Avatar, Chip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";

const UserPage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 350 },
    {
      field: "Avatar",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return <Avatar src={params.row.avatar} />;
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
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
          <Chip label="Lock" variant="outlined" className="w-20 !h-7" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        return params.row.status ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
        );
      },
    },
  ];
  let data = [
    {
      id: 1,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1666836545615avt.jpg?alt=media&token=f3715525-f6d8-42f5-a341-5f9b8d135978",
      username: "Snow Jon",
      email: 35,
      status: true,
    },
    {
      id: 2,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1666836545615avt.jpg?alt=media&token=f3715525-f6d8-42f5-a341-5f9b8d135978",
      username: "Snow Jon",
      email: 35,
      status: true,
    },
    {
      id: 3,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1666836545615avt.jpg?alt=media&token=f3715525-f6d8-42f5-a341-5f9b8d135978",
      username: "Snow Jon",
      email: 35,
      status: false,
    },
  ];

  const [rows, setRows] = useState(data);

  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <DataTable columns={columns} rows={rows} setRows={setRows} />
      </div>
    </div>
  );
};

export default UserPage;

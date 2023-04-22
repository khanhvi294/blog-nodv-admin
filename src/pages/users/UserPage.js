import { Avatar, Box, Button, Chip, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import DataTable from "../../components/DataTable";
import { getAllUsers, updateStatusUser } from "../../api/userApi";
import toast from "react-hot-toast";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
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
      field: "isActive",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params.row.isActive ? (
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
        return params.row.isActive ? (
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
          </svg>
        );
      },
    },
  ];
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data ? data : []);
  useEffect(() => {
    fetchData();
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchData() {
    const listData = await getAllUsers();
    setData([listData]);
    setRows(listData);
  }
  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <DataTable columns={columns} rows={rows} setRows={setRows} />
      </div>
    </div>
  );
};

function DataTable({ columns, rows, setRows }) {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [idReport, setIdReport] = useState("");
  const [dataRow, setDataRow] = useState(rows ? rows : []);
  const [isActive, setisActive] = useState(false);

  const handleConfirm = async () => {
    // eslint-disable-next-line array-callback-return
    // const newRows = rows.map((item) => {
    //   if (item.commentId === idReport) {
    //     item.status = !item.status;
    //   }
    // });
    // setRows(newRows);
    var log = await updateStatusUser(idReport);
    toast.success("BlockUser successfully");
    // console.log(log);
    if (log !== "") {
      toast.success("BlockUser successfully");
    } else {
      toast.error("BlockUser fail");
    }
    setOpenConfirm(false);
  };

  const handleOpen = (id, isActive) => {
    setOpenConfirm(true);
    setIdReport(id);
    setisActive(isActive);
    // console.log(idReport);
  };

  const handleChangeUser = (user) => {
    setCurrentRow(user);
    setOpenConfirm(true);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        disableColumnMenu
        rows={rows ? rows : []}
        columns={columns}
        slots={{
          toolbar: () => {
            return (
              <GridToolbarContainer>
                <GridToolbarFilterButton></GridToolbarFilterButton>
              </GridToolbarContainer>
            );
          },
        }}
        onCellClick={(params) => {
          return params.field === "action"
            ? handleOpen(params.row.id, params.row.isActive)
            : "";
          // return console.log(params);
        }}
      />

      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={handleConfirm}
        isActive={isActive}
      ></ConfirmModal>
    </div>
  );
}

const ConfirmModal = ({ open, handleClose, handleConfirm, isActive }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <Box className="bg-white w-[333px] h-[220px] flex flex-col !justify-center !items-center gap-3">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isActive ? "Block" : "Unblock"} user
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mb: 2 }}
          className="text-slate-500"
        >
          You want {isActive ? "block" : "unblock"} this user?
        </Typography>
        <div className="flex gap-4">
          <Button color="success" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UserPage;

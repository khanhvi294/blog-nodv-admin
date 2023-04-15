import { Avatar, Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import ConfirmModal from "../../components/ConfirmModal";
import { getAllReportComment } from "../../api/commentApi";
import { updateReportComment } from "../../api/commentApi";
import { toast } from "react-toastify";
const CommentReportPage = () => {
  const columns = [
    { field: "commentId", headerName: "ID", width: 350 },
    {
      field: "count",
      headerName: "Count Report",
      width: 150,
      // renderCell: (params) => {
      //   return params.row.type === 1
      //     ? "Rules Violation"
      //     : params.row.type
      //     ? "Harassment"
      //     : "Spam";
      // },
    },
    // {
    //   field: "useraa",
    //   headerName: "User report",
    //   width: 250,
    //   renderCell: (params) => {
    //     return params.row.user.username;
    //   },
    // },
    {
      field: "contentComment",
      headerName: "Content comment reported",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return !params.row.status ? (
          <Chip
            label="Pending"
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
        return !params.row.status ? (
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bababa"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        );
      },
    },
  ];
  const [data, setData] = useState([]);
  const [rows, setRows] = useState(data ? data : []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchData() {
    const listData = await getAllReportComment();
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

export default CommentReportPage;

function DataTable({ columns, rows, setRows }) {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [idReport, setIdReport] = useState("");
  const [dataRow, setDataRow] = useState(rows ? rows : []);

  const handleConfirm = async () => {
    // eslint-disable-next-line array-callback-return
    // const newRows = rows.map((item) => {
    //   if (item.commentId === idReport) {
    //     item.status = !item.status;
    //   }
    // });
    // setRows(newRows);
    var log = await updateReportComment(idReport);
    // console.log(log);
    if (log !== "") {
      toast.success("Delete successfully");
    } else {
      toast.error("Delete fail");
    }
    setOpenConfirm(false);
  };

  const handleOpen = (id) => {
    setOpenConfirm(true);
    setIdReport(id);
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
          return params.field === "action" && params.row.status === false
            ? handleOpen(params.row.id)
            : toast.success("Delete successfully");
          // return console.log(params);
        }}
      />

      <CustomModal
        open={openInfo}
        handleClose={() => setOpenInfo(false)}
      ></CustomModal>
      <ConfirmModal
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleConfirm={handleConfirm}
      ></ConfirmModal>
    </div>
  );
}

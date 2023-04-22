import { Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateReportComment } from "../../api/commentApi";
import ConfirmModal from "../../components/ConfirmModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  deleteCommentById,
  getAllComment,
  getCommentById,
} from "../../api/adminApi";
const CommentReportPage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 9,
  });
  const [page, setPage] = useState(0);
  const [searchParam] = useSearchParams("");
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    const filter = {};
    // if (searchParam.get("id")) {
    //   filter.id = searchParam.get("id");
    // }
    // if (searchParam.get("sortBy")) {
    //   filter.sort = searchParam.get("sortBy");
    // }
    // setFilter(filter);
    console.log("filter: ", searchParam.get("id"));
  }, [searchParam]);
  const storeKey = ["comments", filter];
  const updatePost = () => {
    queryClient.invalidateQueries(storeKey);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 350 },
    {
      field: "idUser",
      headerName: "ID User",
      width: 350,
      renderCell: (params) => {
        return params.row.user.id;
      },
    },
    {
      field: "content",
      headerName: "Content comment reported",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        // console.log(params);
        switch (params.row.status) {
          case "ACTIVE":
            return (
              <Chip
                label="Active"
                color="success"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
          case "Reported":
            return (
              <Chip
                label="Reported"
                color="error"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
          default:
            return (
              <Chip
                label="Active"
                color="success"
                variant="outlined"
                className="w-20 !h-7"
              />
            );
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => handleOpen(params.row.id)}
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

  const [data, setData] = useState();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    if (!searchParam.get("id")) {
      fetchData();
    } else {
      fetchDataById(searchParam.get("id"));
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const [rowCountState, setRowCountState] = useState(data?.totalPages || 0);
  const [idReport, setIdReport] = useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const navigate = useNavigate();
  const removeRowById = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  async function fetchData() {
    const listData = await getAllComment(page);
    console.log(listData);
    setRowCountState(listData.totalElements);
    // setData(listData);
    setRows(listData.content);
  }

  async function fetchDataById(id) {
    const listData = await getCommentById(id);
    // console.log(listData);
    if (listData === "Deleted") {
      setRowCountState(0);
      setRows([]);
    } else {
      setRowCountState(1);
      setRows([listData]);
    }
  }

  const handleOpen = (id) => {
    setOpenConfirm(true);
    setIdReport(id);
    // console.log(idReport);
  };

  const handleConfirm = async () => {
    // eslint-disable-next-line array-callback-return
    var log = await deleteCommentById(idReport);
    console.log(log);
    if (log === "deleted") {
      toast.success("Delete successfully");
      removeRowById(idReport);
    } else {
      toast.error("Delete fail");
    }
    setOpenConfirm(false);
    navigate("/comments");
  };
  console.log("rowCountState: ", rowCountState);

  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        {/* <DataTable columns={columns} rows={rows} setRows={setRows} /> */}
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
            rowCount={rowCountState}
            paginationModel={paginationModel}
            paginationMode="server"
            pageSizeOptions={[9]}
            onPaginationModelChange={(newModel) => {
              setPaginationModel(newModel);
              setPage(newModel.page);
              // console.log("newModel: ", newModel);
              // console.log("page: ", page);
              // console.log("paginationModel.page: ", paginationModel.page);
            }}
            loading={isLoading}
          />
          <ConfirmModal
            open={openConfirm}
            title={"Delete comment"}
            message={"You want delete this comment ?"}
            handleClose={() => setOpenConfirm(false)}
            handleConfirm={handleConfirm}
          ></ConfirmModal>
        </div>
      </div>
    </div>
  );
};

export default CommentReportPage;

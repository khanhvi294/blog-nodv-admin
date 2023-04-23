import { Chip } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  getReportings,
  changeReportingStatus,
  createWarning,
} from "../../api/adminApi";
import UserList from "../../features/reporting/UserList";
import CustomModal from "../../components/CustomModal";
import Tooltip from "@mui/material/Tooltip";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";

const PAGE_SIZE = 5;

const ReportPage = () => {
  // const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [bodyModal, setBodyModal] = useState(<> </>);
  const [reporting, setReporting] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const queryClient = useQueryClient();

  const createWarningMutation = useMutation(createWarning, {
    onSuccess: (data) => {
      toast.success("Create warning to user successfully !!!");

      queryClient.invalidateQueries("reportings");
    },
  });

  const changeReportingStatusMutation = useMutation(changeReportingStatus, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("reportings");
    },
    onError: (error) => {
      console.log("error ", error);
    },
  });

  const { data, fetchNextPage, isLoading, isFetching } = useInfiniteQuery(
    ["reportings"],
    ({ pageParam }) => {
      return getReportings({ page: pageParam, limit: PAGE_SIZE });
    },
    {
      getNextPageParam: (lastPage) => {
        const { last, number } = lastPage;
        return last ? undefined : number + 1;
      },
    }
  );

  const [rowCountState, setRowCountState] = useState(
    data?.pages[0]?.totalElements || 0
  );

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.pages[0]?.totalElements !== undefined
        ? data?.pages[0]?.totalElements
        : prevRowCountState
    );
  }, [data]);

  let rows = useMemo(() => {
    if (data?.pages[paginationModel.page]?.content) {
      return data.pages[paginationModel.page].content.map((item) => {
        return {
          id: item.id,
          userIds: item.userIds,
          type: item.type,
          objectId: item.objectId,
          status: item.status,
          isResolved: item.isResolved,
        };
      });
    }
    return [];
  }, [data, paginationModel]);

  const handleShowObjectId = (data) => {
    let url = `/${data.type.toLowerCase()}s?id=${data.objectId}`;
    window.open(url);
  };

  const showListUser = (params) => {
    console.log("params ", params);
    setBodyModal(<UserList reporting={params} />);
    setOpenModal(true);
  };

  const handleOpenConfirmModal = (data) => {
    setOpenConfirmModal(true);
    setReporting(data);
  };

  const handleConfirmModal = () => {
    setOpenConfirmModal(false);
    changeReportingStatusMutation.mutate(reporting.id);
  };

  const handleOpenWarningModal = (data) => {
    setOpenWarningModal(true);
    setReporting(data);
  };

  const handleCreateWarning = () => {
    setOpenWarningModal(false);
    createWarningMutation.mutate(reporting);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 300,
    },
    {
      field: "userId",
      headerName: "UserId Created",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label="Click to view"
            color="success"
            variant="outlined"
            className="w-50 !h-7 hover:cursor-pointer"
            onClick={() => showListUser(params.row)}
          />
        );
      },
    },

    {
      field: "type",
      headerName: "Type",
      width: 200,
    },

    {
      field: "objectId",
      headerName: "ObjectId",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label="Click to view"
            color="info"
            variant="outlined"
            className="w-50 !h-7 hover:cursor-pointer"
            onClick={() => handleShowObjectId(params.row)}
          />
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return params.row.isResolved ? (
          <Tooltip title="Click to set unresolve" placement="right-start" arrow>
            <Chip
              label="Active"
              color="success"
              variant="outlined"
              className="w-20 !h-7 hover:cursor-pointer"
              onClick={() => handleOpenConfirmModal(params.row)}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Click to set resolved" placement="right-start" arrow>
            <Chip
              label="Pending"
              variant="outlined"
              className="w-20 !h-7 hover:cursor-pointer"
              onClick={() => handleOpenConfirmModal(params.row)}
            />
          </Tooltip>
        );
      },
    },

    {
      field: "actions",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label="Create Warning"
            color="error"
            variant="outlined"
            className="w-50 !h-7 hover:cursor-pointer"
            onClick={() => handleOpenWarningModal(params.row)}
          />
        );
      },
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <div className="w-[1350px] bg-white mt-7">
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            disableColumnMenu
            rows={rows}
            rowCount={rowCountState}
            columns={columns}
            loading={isLoading || isFetching}
            paginationModel={paginationModel}
            paginationMode="server"
            pageSizeOptions={[PAGE_SIZE]}
            onPaginationModelChange={(newModel) => {
              setPaginationModel(newModel);
              fetchNextPage();
            }}
            slots={{
              toolbar: () => {
                return (
                  <GridToolbarContainer>
                    <GridToolbarFilterButton />
                  </GridToolbarContainer>
                );
              },
            }}
          />
        </div>
        <CustomModal
          open={openModal}
          children={bodyModal}
          title="Users Report"
          handleClose={() => setOpenModal(false)}
        />
        <ConfirmModal
          open={openWarningModal}
          title={"Create warning to user"}
          message={"Are you sure to create warning?"}
          handleClose={() => setOpenWarningModal(false)}
          handleConfirm={handleCreateWarning}
        />
        <ConfirmModal
          open={openConfirmModal}
          title={"Change reporting status"}
          message={
            !reporting.isResolved
              ? "Are you sure to resolved this?"
              : "Change unresolved this?"
          }
          handleClose={() => setOpenConfirmModal(false)}
          handleConfirm={handleConfirmModal}
        />
      </div>
    </div>
  );
};

export default ReportPage;

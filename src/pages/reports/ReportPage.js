import { Chip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getAllReportings,
  changeReportingStatus,
  createWarning,
} from "../../api/adminApi";
import UserList from "../../features/reporting/UserList";
import CustomModal from "../../components/CustomModal";
import Tooltip from "@mui/material/Tooltip";
import ConfirmModal from "../../components/ConfirmModal";
import { createNotification } from "../../api/notificationApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ReportPage = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [bodyModal, setBodyModal] = useState(<> </>);
  const [reporting, setReporting] = useState({});
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.data.info);

  const createWarningMutation = useMutation(createWarning, {
    onSuccess: (data) => {
      toast.success("Create warning to user successfully !!!");
      queryClient.setQueryData("reportings", (oldData) => {
        let newData = oldData.map((element) => {
          if (element.id === data.id) {
            return data;
          }
          return element;
        });
        return newData;
      });

      setRows(reportingsQuery);
    },
  });

  const changeReportingStatusMutation = useMutation(changeReportingStatus, {
    onSuccess: (data) => {
      queryClient.setQueryData("reportings", (oldData) => {
        let newData = oldData.map((element) => {
          if (element.id === data.id) {
            return data;
          }
          return element;
        });
        return newData;
      });

      setRows(reportingsQuery);
    },
    onError: (error) => {
      console.log("error ", error);
    },
  });

  const { data: reportingsQuery } = useQuery("reportings", getAllReportings, {
    onSuccess: (data) => {
      setRows(data);
    },
  });

  const handleShowObjectId = (data) => {
    let url = `/${data.type.toLowerCase()}s?id=${data.objectId}`;
    window.open(url);
  };

  const showListUser = (params) => {
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
        <DataTable
          columns={columns}
          rows={rows}
          setRows={setRows}
          comModal={<UserList />}
        />
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

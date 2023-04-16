import { Chip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllReportings, changeReportingStatus } from "../../api/adminApi";
import UserList from "../../features/reporting/UserList";
import CustomModal from "../../components/CustomModal";
import Tooltip from "@mui/material/Tooltip";
import ConfirmModal from "../../components/ConfirmModal";

const ReportPage = () => {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [bodyModal, setBodyModal] = useState(<> </>);
  const [reporting, setReporting] = useState({});
  const queryClient = useQueryClient();

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
    let url = `/${data.type.toLowerCase()}s?id=${data.id}`;
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
      width: 300,
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
      width: 270,
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

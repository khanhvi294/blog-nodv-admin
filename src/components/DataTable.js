import { Avatar, Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import * as React from "react";
import ConfirmModal from "./ConfirmModal";
import CustomModal from "./CustomModal";

export default function DataTable({ columns, rows, setRows }) {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const handleConfirm = () => {
    const newRows = rows.map((item) => {
      return item.id === currentRow.id
        ? { ...item, status: !item.status }
        : item;
    });
    setRows(newRows);
    setOpenConfirm(false);
  };

  const handleChangeUser = (user) => {
    setCurrentRow(user);
    setOpenConfirm(true);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        disableColumnMenu
        rows={rows}
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
            ? handleChangeUser(params.row)
            : setOpenInfo(true);
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

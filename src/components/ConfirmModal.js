import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const ConfirmModal = ({ open, handleClose, handleConfirm }) => {
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
          Block user
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mb: 2 }}
          className="text-slate-500"
        >
          You want block this user?
        </Typography>
        <div className="flex gap-4">
          <Button color="success" onClick={handleConfirm}>
            Xác Nhận
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;

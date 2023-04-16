import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const ConfirmModal = ({ title, message, open, handleClose, handleConfirm }) => {
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
          {title || "Block user"}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mb: 2 }}
          className="text-slate-500"
        >
          {message || "You want block this user?"}
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

export default ConfirmModal;

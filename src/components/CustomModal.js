import { Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CustomModal = ({ title, open, handleClose, data, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white w-[500px] h-[500px] m-auto p-6 ">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;

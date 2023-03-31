import { Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CustomModal = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white w-[500px] h-[600px] m-auto p-6">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="mb-5 font-bold"
        >
          Profile information
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;

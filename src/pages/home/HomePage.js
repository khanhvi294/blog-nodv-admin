import { Button } from "@mui/material";
import React, { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-20 h-10">
        <Button onClick={() => setOpen(true)}>open</Button>
        <ConfirmModal
          open={open}
          handleClose={() => setOpen(false)}
        ></ConfirmModal>
      </div>
    </>
  );
};

export default HomePage;

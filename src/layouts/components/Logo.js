import { Button, Link } from "@mui/material";
import React from "react";

import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <Button className="h-full w-full object-contain">
        <img className="w-[118px]" src={logo} alt="logo" />
      </Button>
    </Link>
  );
};

export default Logo;

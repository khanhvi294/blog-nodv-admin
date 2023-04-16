import { Button } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/" className="w-full h-full">
      <Button className="h-full w-full object-contain">
        <img className="w-[118px]" src={logo} alt="logo"></img>
      </Button>
    </Link>
  );
};

export default Logo;

import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import React from "react";
import { appRoutes } from "./AppRoutes";
import { checkedRole } from "../utils/checkedRole";

const PublicRouter = () => {
  const { isLogin, info } = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  if (isLogin && checkedRole(info)) {
    navigate(appRoutes.HOME);
  }

  return <Outlet />;
};

export default PublicRouter;

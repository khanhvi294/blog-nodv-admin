import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { appRoutes } from "./AppRoutes";

const PublicRouter = () => {
  const { isLogin } = useSelector((state) => state.user.data);

  return isLogin ? <Navigate to={appRoutes.HOME} replace /> : <Outlet />;
};

export default PublicRouter;

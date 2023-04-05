import React from "react";
import { useNavigate } from "react-router";
import { appRoutes } from "../routers/AppRoutes";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate(appRoutes.AUTH_LOGIN);
    dispatch(logout());
  };
  return {
    handleLogout,
  };
};

export default useLogout;

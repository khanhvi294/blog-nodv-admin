import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "./AppRoutes";

const ProtectedRoutes = () => {
  const { isLogin } = useSelector((state) => state.user.data);
  const user = useSelector((state) => state.user.data);

  // console.log("isLogin ", isLogin, user);
  return isLogin ? <Outlet /> : <Navigate to={appRoutes.AUTH_LOGIN} replace />;
};

export default ProtectedRoutes;

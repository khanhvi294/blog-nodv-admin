import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "./AppRoutes";
import { checkedRole } from "../utils/checkedRole";

const ProtectedRoutes = () => {
  const { isLogin } = useSelector((state) => state.user.data);
  const user = useSelector((state) => state.user.data);

  return isLogin && checkedRole(user?.info) ? (
    <Outlet />
  ) : (
    <Navigate to={appRoutes.AUTH_LOGIN} replace />
  );
};

export default ProtectedRoutes;

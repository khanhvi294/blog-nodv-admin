import redirectImg from "../../assets/images/redirect_rocket.gif";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { appRoutes } from "../../routers/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate(appRoutes.HOME);
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img src={redirectImg} alt="redirect..." />
    </div>
  );
};

export default Logout;

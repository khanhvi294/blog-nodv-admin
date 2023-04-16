import AppRoutes from "./routers/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { updateUserInfo } from "./redux/slices/userSlice";
import { getAuthInfo } from "./api/authApi";
import { checkedRole } from "./utils/checkedRole";
import useLogout from "./hooks/useLogout";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const { isLogin } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const { handleLogout } = useLogout();

  useQuery("user", getAuthInfo, {
    enabled: isLogin,
    onSuccess: (data) => {
      if (checkedRole(data)) {
        dispatch(updateUserInfo(data));
      } else {
        toast.error("You don't have permission for this resources");
        handleLogout();
      }
    },
    onError: (err) => {
      console.log("err dcm ", err);
    },
  });

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />;
    </>
  );
}

export default App;

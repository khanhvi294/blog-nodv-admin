import "./App.css";
import AppRoutes from "./routers/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { updateUserInfo } from "./redux/slices/userSlice";
import { getAuthInfo } from "./api/authApi";
import { checkedRole } from "./utils/checkedRole";
import useLogout from "./hooks/useLogout";

function App() {
  const { isLogin } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  const { handleLogout } = useLogout();

  useQuery("user", getAuthInfo, {
    enabled: isLogin,
    onSuccess: (data) => {
      if (checkedRole(data)) {
        dispatch(updateUserInfo(data));
      } else {
        handleLogout();
      }
    },
  });

  return <AppRoutes />;
}

export default App;

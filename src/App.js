import "./App.css";
import AppRoutes from "./routers/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { updateUserInfo } from "./redux/slices/userSlice";
import { getAuthInfo } from "./api/authApi";

function App() {
  const { isLogin } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();

  useQuery("user", getAuthInfo, {
    enabled: isLogin,
    onSuccess: (data) => {
      dispatch(updateUserInfo(data));
    },
  });

  return <AppRoutes />;
}

export default App;

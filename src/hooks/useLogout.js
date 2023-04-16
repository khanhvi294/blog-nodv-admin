import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/slices/userSlice';
import { appRoutes } from '../routers/AppRoutes';

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

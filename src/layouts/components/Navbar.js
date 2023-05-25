import * as React from 'react';

import {
	CircularProgress,
	ClickAwayListener,
	Fade,
	Popper,
} from '@mui/material';
import { EyeIcon, FlagIcon } from '../../assets/icons/heroicons';
import { Link, useNavigate } from 'react-router-dom';
import {
	getNotifications,
	setNotificationRead,
} from '../../api/notificationApi';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { appRoutes } from '../../routers/AppRoutes';
import { formatRelative } from 'date-fns';
import { resetCountNotifications } from '../../api/userApi';
import { setUser } from '../../redux/slices/userSlice';
import useLogout from '../../hooks/useLogout';

function Navbar() {
	const user = useSelector((state) => state.user.data.info);
	const [open, setOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const { handleLogout } = useLogout();

	const handleOpenUserMenu = (event) => {
		setOpen(true);
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setOpen(false);
		setAnchorElUser(null);
	};
	const handleGoToProfile = React.useCallback(() => {
		navigate(appRoutes.PROFILE);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const settings = React.useRef([
		{
			title: 'Profile',
			path: '/profile',
			handleOnClick: () => {
				handleCloseUserMenu();
				setTimeout(() => handleGoToProfile(), 1);
			},
		},
		{ title: 'Logout', path: '/logout', handleOnClick: handleLogout },
	]).current;

	return (
		<AppBar className="!w-full !bg-black ">
			<Container>
				<Toolbar disableGutters className="justify-end">
					<Box sx={{ flexGrow: 0 }} className="mr-5">
						<Box sx={{ flexGrow: 0 }}>
							<NotificationBell>
								<IconButton
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={17} color="error">
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</NotificationBell>
						</Box>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar alt="Remy Sharp" src={user?.avatar} />
							</IconButton>
						</Tooltip>
						<Menu
							open={open}
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting.title}
									onClick={setting.handleOnClick}
									className="w-36"
								>
									<p>{setting.title}</p>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default Navbar;

const NotificationBell = ({ children }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const socket = useSelector((state) => state.socket.data);
	const currentUserId = useSelector((state) => state.user.data.info.id);
	const [open, setOpen] = React.useState(false);
	const numBadge = useSelector(
		(state) => state.user.data.info.notificationsCount,
	);
	const updateUserCountNotification = useMutation(resetCountNotifications, {
		onSuccess: (data) => {
			dispatch(setUser(data));
		},
	});

	const handleClose = () => {
		setOpen(false);
	};

	const handleReceiveCountNotificationSocket = React.useCallback(
		(payload) => {
			const data = JSON.parse(payload.body);
			dispatch(setUser(data));
		},
		[dispatch],
	);

	React.useEffect(() => {
		const topic = `/topic/notifications/${currentUserId}/countNotifications`;
		if (socket) {
			socket.subscribe(topic, handleReceiveCountNotificationSocket);
		}
		return () => {
			if (socket) {
				socket.unsubscribe(topic);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen((prev) => !prev);

		if (numBadge > 0) updateUserCountNotification.mutate();
	};

	return (
		<div>
			<div variant="contained" onClick={handleClick}>
				<IconButton size="large" color="inherit">
					<Badge badgeContent={numBadge} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
			</div>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="bottom"
				transition
				className="z-[9999]"
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<div>
							<ClickAwayListener onClickAway={handleClose}>
								<div>
									<NotificationList />
								</div>
							</ClickAwayListener>
						</div>
					</Fade>
				)}
			</Popper>
		</div>
	);
};

const NotificationList = () => {
	const { data: notifications, isLoading } = useQuery('notifications', () =>
		getNotifications({ limit: 5, page: 0 }),
	);
	return (
		<>
			<div
				id="dropdownNotification"
				className="z-20 w-full max-w-sm min-w-[360px] divide-y rounded-xl divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
			>
				{!isLoading ? (
					<>
						<div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
							Notifications
						</div>
						<div className="divide-y divide-gray-100 dark:divide-gray-700">
							{notifications?.map((notification) => (
								<NotificationItem
									key={notification.id}
									notification={notification}
								/>
							))}
						</div>
						<Link
							to="/notifications"
							className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
						>
							<div className="inline-flex items-center ">
								<EyeIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
								View all
							</div>
						</Link>
					</>
				) : (
					<div className="flex items-center justify-center w-full min-h-[302px] h-full p-4">
						<CircularProgress size={36} />
					</div>
				)}
			</div>
		</>
	);
};

function NotificationItem({ notification }) {
	const { mutate: markAsRead } = useMutation(setNotificationRead);
	const handleClick = () => {
		markAsRead(notification.id);
	};

	return (
		<div
			className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
			onClick={handleClick}
		>
			<div className="flex-shrink-0 rounded-full w-11 h-11">
				<img
					className="object-cover w-full h-full rounded-full"
					src={notification.sender.avatar}
					alt={notification.sender.username}
				/>
				<div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
					<FlagIcon className="w-3 h-3 text-white" />
				</div>
			</div>
			<div className="w-full pl-3">
				<div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
					<span className="font-semibold text-gray-900 dark:text-white">
						{notification.sender.username}
					</span>{' '}
					was reported a content
				</div>
				<div className="text-xs text-blue-600 dark:text-blue-500">
					{formatRelative(
						new Date(notification.createdDate),
						Date.now(),
					)}
				</div>
			</div>
			{!notification.isRead && (
				<div className="flex items-center">
					<div className="flex-shrink-0 rounded-full bg-blue-500 w-3 h-3 " />
				</div>
			)}
		</div>
	);
}

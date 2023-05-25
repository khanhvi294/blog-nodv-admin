import * as React from "react";

import { CircularProgress, Popover } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getNotifications,
  setNotificationRead,
} from "../../api/notificationApi";
import { resetCountNotifications } from "../../api/userApi";
import { EyeIcon, FlagIcon } from "../../assets/icons/heroicons";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { formatRelative } from "date-fns";
import useLogout from "../../hooks/useLogout";
import { setUser } from "../../redux/slices/userSlice";
import { appRoutes } from "../../routers/AppRoutes";

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
      title: "Profile",
      path: "/profile",
      handleOnClick: () => {
        handleCloseUserMenu();
        setTimeout(() => handleGoToProfile(), 1);
      },
    },
    { title: "Logout", path: "/logout", handleOnClick: handleLogout },
  ]).current;

  return (
    <AppBar className="!w-full !bg-white ">
      <Container className="!pr-9 !max-w-none">
        <Toolbar disableGutters className="justify-end">
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 0 }} className="mr-5">
              <NotificationBell>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsNoneIcon className="text-zinc-500" />
                  </Badge>
                </IconButton>
              </NotificationBell>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.avatar}
                  className="border-2"
                />
              </IconButton>
            </Tooltip>
            <Menu
              open={open}
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
  const numBadge = useSelector(
    (state) => state.user.data.info.notificationsCount
  );
  const updateUserCountNotification = useMutation(resetCountNotifications, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (numBadge > 0) updateUserCountNotification.mutate();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleReceiveCountNotificationSocket = React.useCallback(
    (payload) => {
      const data = JSON.parse(payload.body);
      dispatch(setUser(data));
    },
    [dispatch]
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

  return (
    <div>
      <div aria-describedby={id} variant="contained" onClick={handleClick}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={numBadge} color="error">
            <NotificationsNoneIcon className="text-zinc-500" />
          </Badge>
        </IconButton>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <NotificationList />
      </Popover>
    </div>
  );
};

const NotificationList = () => {
  const { data: notifications, isLoading } = useQuery("notifications", () =>
    getNotifications({ limit: 5, page: 0 })
  );
  return (
    <>
      <div
        id="dropdownNotification"
        className="z-20 w-full max-w-sm min-w-[360px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
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
    <Link
      href="/"
      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        <img
          className="rounded-full w-11 h-11"
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
          </span>{" "}
          was reported a content
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500">
          {formatRelative(new Date(notification.createdDate), Date.now())}
        </div>
      </div>
      {!notification.isRead && (
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-full bg-blue-500 w-3 h-3 " />
        </div>
      )}
    </Link>
  );
}

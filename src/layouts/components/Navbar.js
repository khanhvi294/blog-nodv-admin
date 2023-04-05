import NotificationsIcon from "@mui/icons-material/Notifications";
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
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../routers/AppRoutes";
import useLogout from "../../hooks/useLogout";

function Navbar() {
  const anchorRef = React.useRef();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  //   React.useEffect(() => {
  //     setTimeout(() => setAnchorEl(anchorRef?.current), 1)
  // },  [anchorRef])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleGoToProfile = React.useCallback(() => {
    console.log("okok");
    navigate(appRoutes.PROFILE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = React.useRef([
    { title: "Profile", path: "/profile", handleOnClick: handleGoToProfile },
    { title: "Logout", path: "/logout", handleOnClick: handleLogout },
  ]).current;

  return (
    <AppBar className="!w-full !bg-black" position="sticky">
      <Container>
        <Toolbar disableGutters className="justify-end">
          <Box sx={{ flexGrow: 0 }} className="mr-5">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link to="/notifications">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
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
              open={Boolean(anchorElUser)}
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

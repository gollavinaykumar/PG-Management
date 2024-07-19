import { Box } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { getRooms } from "../Services/getAllRooms";
import { usersStore } from "../zustand/usersStore";
import { useUserStore } from "../zustand/useUserStore";
import { roomsStore } from "../zustand/roomstore";

import { Link, useNavigate, useParams } from "react-router-dom";

const { Meta } = Card;

const Cards = ({ room, allUsers }: any) => {
  const filterRoomsWise = allUsers.filter((e: any) => room.id == e.roomId);

  let left = room.capacity - filterRoomsWise.length;
  return (
    <Link to={`/${room.id}`} style={{ textDecoration: "none" }}>
      <Card
        style={{ width: "100%", margin: 5 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={`Room No : ${room.roomno}`}
          description={`Capacity - ${room.capacity}`}
        />
        {left <= 0 ? (
          <h5 style={{ color: "red", textAlign: "end" }}>Beds Full</h5>
        ) : (
          <h5 style={{ color: "green", textAlign: "end" }}>{left} beds left</h5>
        )}
      </Card>
    </Link>
  );
};

const pages = [
  { name: "Home", link: "/" },
  { name: "Add Room", link: "/newroom" },
  { name: "dashboard", link: "/dashboard" },
];
const settings = [{ name: "logout", link: "/signin" }];

export function AdminHeader() {
  const navigate = useNavigate();
  const loggedUser = useUserStore((s: any) => s.user);
  React.useEffect(() => {
    if (!loggedUser[0].id) {
      navigate("/signin");
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const setUser = useUserStore((s: any) => s.removeUser);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <Link
                  to={page.link}
                  key={index}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link
                to={page.link}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Admin"
                  src={loggedUser[0].image != null ? loggedUser[0].image : ""}
                />
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
              {settings.map((setting, index) => (
                <Link
                  to={setting.link}
                  key={index}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setUser();
                  }}
                >
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function UserHeader() {
  const loggedUser = useUserStore((s: any) => s.user);
  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!loggedUser[0].id) {
      navigate("/signin");
    }
  }, []);

  const pages1 = [
    { name: "Home", link: "/" },
    { name: "Issues", link: `/${params.roomid}/Issues` },
  ];
  const settings1 = [{ name: "logout", link: "/signin" }];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const setUser = useUserStore((s: any) => s.removeUser);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages1.map((page) => (
                <Link
                  to={page.link}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages1.map((page) => (
              <Link to={page.link} style={{ textDecoration: "none" }}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Admin"
                  src={loggedUser[0].image != null ? loggedUser[0].image : ""}
                />
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
              {settings1.map((setting) => (
                <Link
                  to={setting.link}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setUser();
                  }}
                >
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const loggedUser = useUserStore((s: any) => s.user);
 

  React.useEffect(() => {
    {
      loggedUser.length == 0
        ? navigate("/signin")
        : loggedUser[0].email.split("@")[1] == "gmail.com" &&
          navigate(`/${loggedUser[0].roomId}`);
    }
  }, []);
  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }
  return (
    <div>
      <Admin />
    </div>
  );
}

function Admin() {
  const [AllRooms, setRooms] = React.useState([]);
  const setRoomsAll = roomsStore((s: any) => s.setRooms);
  const allUsers = usersStore((s: any) => s.user);
  const navigate = useNavigate();
  const loggedUser = useUserStore((s: any) => s.user);
  React.useEffect(() => {
    {
      loggedUser.length == 0
        ? navigate("/signin")
        : loggedUser[0].email.split("@")[1] == "gmail.com" &&
          navigate(`/${loggedUser[0].roomId}`);
    }
    fetchdata();
  }, []);
  async function fetchdata() {
    const getRoomsAll = await getRooms();
    setRooms(getRoomsAll);
    setRoomsAll(getRoomsAll);
  }
  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }
  return (
    <Box>
      <AdminHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          padding: 2,
        }}
      >
        {AllRooms.map((room: any) => {
          return <Cards key={room.id} room={room} allUsers={allUsers} />;
        })}
      </Box>
    </Box>
  );
}

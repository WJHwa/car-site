import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import DrawerMenu from "../DrawMenu/DrawerMenu";
import {
  CarRental,
  CarCrash,
  Chat,
  DynamicFeed,
  Login,
  GroupAdd,
  AdminPanelSettings,
  Logout,
  BallotRounded,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Avatar, AppBar, Toolbar, Button, Grid, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../img/logo.png";

const styles = makeStyles({
  button: {
    "&:hover": {
      background: "white",
    },
  },
});

function Header() {
  const [Toggle, setToggle] = useState(false);
  const [button, setButton] = useState([
    {
      name: "내차사기",
      icon: CarRental,
      path: "/productlist",
    },
    {
      name: "내차팔기",
      icon: CarCrash,
      path: "/consult",
    },
    {
      name: "상담하기",
      icon: Chat,
      path: "/consult",
    },
    {
      name: "판매후기",
      icon: DynamicFeed,
      path: "/review",
    },
  ]);
  const { isLogin, user, setUser, setIsLogin, MdMedio } =
    useContext(AppContext);

  const navigate = useNavigate();
  const classes = styles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggle(open);
  };

  useEffect(() => {
    if (user.name === "admin") {
      setButton([
        {
          name: "내차사기",
          icon: CarRental,
          path: "/productlist",
        },
        {
          name: "판매후기",
          icon: DynamicFeed,
          path: "/review",
        },
      ]);
    }
  }, []);

  return (
    <>
      {!MdMedio ? (
        <Grid container>
          <AppBar position="static" color="primary" sx={{ height: 70 }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: 70,
              }}
            >
              <Button color="inherit" onClick={() => navigate("/")}>
                <Avatar src={logo} />
              </Button>

              <Box>
                {button.map((v, i) => (
                  <Button
                    key={i}
                    color="inherit"
                    sx={{
                      mr: 3,
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                    onClick={() =>
                      v.name === "내차팔기"
                        ? navigate(v.path, {
                            state: {
                              category: "판매",
                            },
                          })
                        : navigate(v.path)
                    }
                  >
                    <Avatar sx={{ background: "none" }}>{<v.icon />}</Avatar>
                    {v.name}
                  </Button>
                ))}
              </Box>
              {!isLogin ? (
                <Box>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/register")}
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <GroupAdd />
                    </Avatar>
                    회원가입
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/login")}
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <Login />
                    </Avatar>
                    로그인
                  </Button>
                </Box>
              ) : user.name !== "admin" ? (
                <Box>
                  <Button
                    color="inherit"
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                    onClick={() => {
                      sessionStorage.removeItem("key");
                      setIsLogin(false);
                      setUser({ name: "" });

                      navigate("/");
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <Logout />
                    </Avatar>
                    로그아웃
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/admin/carlist")}
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <BallotRounded />
                    </Avatar>
                    차량 리스트
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/admin/consultlist")}
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <AdminPanelSettings />
                    </Avatar>
                    상담리스트
                  </Button>
                  <Button
                    sx={{
                      "&:hover": {
                        background: "#BCBCBC",
                      },
                    }}
                    color="inherit"
                    onClick={() => {
                      sessionStorage.removeItem("key");
                      setIsLogin(false);
                      setUser({ name: "" });
                      navigate("/");
                    }}
                  >
                    <Avatar sx={{ background: "none" }}>
                      <Logout />
                    </Avatar>
                    로그아웃
                  </Button>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
      ) : (
        <Grid container>
          <AppBar
            position="static"
            sx={{
              background: "#2E3B55",
              height: 70,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button color="inherit" onClick={() => navigate("/")}>
                <Avatar src={logo} />
              </Button>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                sx={{ height: 70 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <DrawerMenu
                Toggle={Toggle}
                toggleDrawer={toggleDrawer}
                button={button}
                navigate={navigate}
              />
            </Toolbar>
          </AppBar>
        </Grid>
      )}
    </>
  );
}

export default Header;

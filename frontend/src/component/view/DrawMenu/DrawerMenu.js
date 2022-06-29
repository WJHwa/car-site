import React, { useContext } from "react";
import { AppContext } from "../../../App";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Login,
  GroupAdd,
  Logout,
  AdminPanelSettings,
  BallotRounded,
} from "@mui/icons-material";
import Box from "@mui/material/Box";

function DrawerMenu({ Toggle, toggleDrawer, button, navigate }) {
  const { isLogin, user, setIsLogin, setUser, removeCookie } =
    useContext(AppContext);

  return (
    <>
      <Drawer anchor={"right"} open={Toggle} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 230 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {button.map((v, i) => (
              <ListItem disablePadding key={i}>
                <ListItemButton
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
                  <ListItemIcon>
                    <v.icon />
                  </ListItemIcon>
                  <ListItemText>{v.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {!isLogin ? (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/register")}>
                  <ListItemIcon>
                    <GroupAdd />
                  </ListItemIcon>
                  <ListItemText>회원가입</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/login")}>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText>로그인</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          ) : user.name !== "admin" ? (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    sessionStorage.removeItem("key");
                    setIsLogin(false);
                    removeCookie("login");
                    setUser({ name: "" });
                    navigate("/");
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>로그아웃</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/admin/carlist")}>
                  <ListItemIcon>
                    <BallotRounded />
                  </ListItemIcon>
                  <ListItemText>차량 리스트</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/admin/consultlist")}>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText>상담 리스트</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    sessionStorage.removeItem("key");
                    setIsLogin(false);
                    setUser({ name: "" });
                    removeCookie("login");
                    navigate("/");
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>로그아웃</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerMenu;

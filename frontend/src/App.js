import React, { createContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import GuestRoute from "./navigate/GuestRoute";
import MemberRoute from "./navigate/MemberRoute";
import AdminRoute from "./navigate/AdminRoute";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({ name: "", phone: "" });
  const [isLogin, setIsLogin] = useState(false);
  const themes = useTheme();
  const LgMedio = useMediaQuery(themes.breakpoints.down("lg"));
  const MdMedio = useMediaQuery(themes.breakpoints.down("md"));
  const SmMedio = useMediaQuery(themes.breakpoints.down("sm"));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2E3B55",
        contrastText: "white",
      },
      success: {
        main: "#FDD431",
        contrastText: "black",
      },
    },
  });
  async function get(token) {
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    };
    const res = await axios.get("/islogin", config);
    if (res.data.admin) {
      setIsLogin(true);
      return setUser({ name: "admin", ids: res.data.ids });
    } else {
      setIsLogin(true);
      return setUser({
        name: res.data.name,
        phone: res.data.phone,
        ids: res.data.ids,
      });
    }
  }

  useEffect(() => {
    let Mounted = true;
    const token = sessionStorage.getItem("key");
    if (token !== null) {
      get(token);
    }
    return () => (Mounted = false);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          user,
          isLogin,
          setIsLogin,
          setUser,
          LgMedio,
          MdMedio,
          SmMedio,
        }}
      >
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            {!isLogin ? (
              <GuestRoute />
            ) : isLogin && user.name === "admin" ? (
              <AdminRoute />
            ) : (
              <MemberRoute />
            )}
          </ThemeProvider>
        </SnackbarProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  Checkbox,
  Container,
  Box,
  FormControlLabel,
  Avatar,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LockOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { AppContext } from "../../../App";
import axios from "axios";

const styles = makeStyles({
  login_box: {
    marginTop: "10%",
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "0 solid #DFDCDC",
    borderTopWidth: "0.1px",
    borderLeftWidth: "0.1px",
    borderRadius: "10px 10px 10px 10px",
    paddingBottom: "20px",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "40px",
    WebkitBoxShadow: "27px 43px 43px -20px rgba(89,89,89,0.39)",
  },
});

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [check, setCheck] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idErr, setIdErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const { setIsLogin, setUser } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = styles();

  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }
  function handleOnChange(e) {
    setCheck(e.target.checked);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIdErr(false);
    setPasswordErr(false);
    if (id === "") {
      return Alerts("아이디를 입력해주세요.", "info");
    } else if (password === "") {
      return Alerts("비밀번호를 입력해주세요.", "info");
    }
    var hour = 3600000;

    if (check) {
      setCookie("userId", id, { expires: new Date(Date.now() + hour) });
    } else {
      removeCookie("userId");
    }

    let body = {
      id: id,
      password: password,
    };

    const res = await axios.post("/login", body);
    if (!res.data) {
      return Alerts("로그인중 오류가 발생했습니다.", "info");
    } else if (res.data === "비밀번호를 잘못 입력했습니다.") {
      Alerts(res.data, "info");
      return setPasswordErr(true);
    } else if (res.data === "아이디를 잘못 입력했습니다.") {
      Alerts(res.data, "info");
      return setIdErr(true);
    }
    sessionStorage.setItem(
      "key",
      JSON.stringify({
        tok: res.data.Token,
      })
    );
    if (res.data.admin === "on") {
      setIsLogin(true);
      setUser({ name: "admin", ids: res.data.ids });
    } else {
      setIsLogin(true);
      setUser({
        name: res.data.name,
        phone: res.data.phone,
        ids: res.data.ids,
      });
      Alerts("로그인을 하셨습니다.", "success");
    }
    return navigate("/", { replace: true });
  }

  useEffect(() => {
    if (cookies.userId !== undefined) {
      setId(cookies.userId);
      setCheck(true);
    }
  }, []);

  return (
    <>
      <Container component={"main"} maxWidth="md">
        <Box className={classes.login_box}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#2E3B55",
              width: 60,
              height: 60,
            }}
          >
            <LockOutlined />
          </Avatar>
          <Typography sx={{ mb: 2, fontSize: "25px" }}>로그인</Typography>
          <Box component={"form"} onSubmit={onSubmit}>
            <FormControl>
              <TextField
                label="아이디"
                name="id"
                margin="normal"
                required
                autoFocus
                size="small"
                value={id}
                error={idErr ? true : false}
                onChange={(e) => {
                  setId(e.target.value);
                  setIdErr(false);
                }}
              />
              <TextField
                label="비밀번호"
                name="password"
                margin="normal"
                type="password"
                required
                size="small"
                error={passwordErr ? true : false}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErr(false);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check}
                    value={check}
                    onChange={handleOnChange}
                  />
                }
                label="ID 저장하기"
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 3, p: 2 }}
              >
                로그인
              </Button>
            </FormControl>
          </Box>
          <Grid container mb={2} justifyContent={"space-around"}>
            <Link>비밀번호를 잊어버리셨나요?</Link>
            <Link href="/register">회원가입</Link>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Login;

import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../../../App";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  formcheck: {
    width: "90%",
    height: 200,
    border: "1px solid grey",
    borderRadius: "7px 0 0 0",
    marginLeft: "20px",
    textAlign: "center",
  },
  container: {
    marginTop: "25px",
    paddingTop: "10px",
    paddingBottom: "30px",
    marginBottom: "40px",
    background: "#E0E0E0",
    borderRadius: "15px",
    WebkitBoxShadow: "27px 50px 50px -20px rgba(89,89,89,0.39)",
  },
  gridContainer: {
    marginTop: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    marginBottom: "20px",
    background: "white",
    borderRadius: "15px",
  },
  consultTitle: {
    textAlign: "center",
    fontSize: "25px",
    marginTop: "10px",
    paddingBottom: "20px",
    fontWeight: "bold",
  },
  button: {
    paddingTop: "30px",
    paddingBottom: "30px",
    fontSize: "20px",
    background: "#2E3B55",
  },
});

function Consult() {
  const [Inputs, setInputs] = useState({
    name: "",
    phone: "",
    time: "",
    title: "",
    contents: "",
  });
  const [category, setCategory] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
  });

  const { user, LgMedio } = useContext(AppContext);

  const { name, phone, time, title, contents } = Inputs;
  const { check1, check2 } = check;

  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const classes = styles();

  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }
  const list = [
    { name: "name", label: "이름", value: name },
    { name: "phone", label: "연락처", value: phone },
    { name: "time", label: "연락 가능 시간", value: time },
  ];

  function onChangeInput(e) {
    const { name, value } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  }

  function onCheckChange(e) {
    const { name, checked } = e.target;
    setCheck({
      ...check,
      [name]: checked,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

    if (!regPhone.test(phone)) {
      return Alerts("전화번호는 정확하게 입력해주세요.", "info");
    }
    if (name === "") {
      return Alerts("이름을 입력해주세요.", "info");
    }
    if (time === "") {
      return Alerts("연락 가능 시간을 입력해주세요.", "info");
    }
    if (title === "") {
      return Alerts("제목을 입력해주세요.", "info");
    }
    if (contents === "") {
      return Alerts("제목을 입력해주세요.", "info");
    }

    let data = {
      Inputs,
      category,
    };

    let res = await axios.post("/consult", data);
    if (res.data) {
      Alerts(
        "신청이 완료되었습니다. 1시간 이내로 연락드리겠습니다.",
        "success"
      );
      return navigate("/");
    } else {
      Alerts("등록중 오류가 발생했습니다. 다시 시도해 주세요.", "info");
    }
  }

  useEffect(() => {
    if (location.state) {
      setCategory(location.state.category);
    }
    if (user.name !== "") {
      setInputs({
        ...Inputs,
        ["name"]: user.name,
        ["phone"]: user.phone,
      });
    }
  }, []);

  return (
    <>
      <Container component={"main"} maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        <Container maxWidth={"md"} className={classes.container}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "25px",
              marginTop: "10px",
              paddingBottom: "20px",
              fontWeight: "bold",
            }}
          >
            상담하기
          </Typography>
          <Grid container spacing={1} className={classes.gridContainer}>
            {list.map((v, i) => (
              <Grid item xs={6} md={3} lg={6} key={i}>
                <Typography ml={6}>{v.label}</Typography>
                <FormControl
                  variant="standard"
                  sx={{ ml: LgMedio ? 2 : 6, mr: 1 }}
                >
                  <TextField
                    onChange={onChangeInput}
                    value={v.value && v.value}
                    name={v.name}
                    margin="normal"
                    label={v.label}
                    placeholder={
                      v.name === "phone"
                        ? "'-'를 뺴고 입력해주세요."
                        : v.name === "time"
                        ? "예시:~시 이후"
                        : ""
                    }
                    required
                    autoFocus
                    size="small"
                  />
                </FormControl>
              </Grid>
            ))}

            <Grid item xs={6} md={3} lg={6}>
              <Typography ml={6}>상담유형</Typography>
              <FormControl
                onChange={onChangeInput}
                name="category"
                variant="standard"
                size={"large"}
                sx={{
                  m: 1,
                  minWidth: LgMedio ? 180 : 200,
                  ml: LgMedio ? 2 : 6,
                }}
              >
                <Select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <MenuItem value={"구입"}>구입</MenuItem>
                  <MenuItem value={"판매"}>판매</MenuItem>
                  <MenuItem value={"기타"}>기타문의</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography
            textAlign={"center"}
            fontSize={"25px"}
            mt={2}
            fontWeight="bold"
          >
            상담 정보
          </Typography>
          <Grid container className={classes.gridContainer}>
            <FormControl fullWidth sx={{ ml: 3, mr: 3 }}>
              <TextField
                onChange={onChangeInput}
                name="title"
                label="제목"
                margin="normal"
                size="small"
                placeholder="제목을 입력해주세요."
                required
              />
            </FormControl>
            <FormControl fullWidth sx={{ ml: 3, mr: 3 }}>
              <TextField
                onChange={onChangeInput}
                name="contents"
                label="상담내용"
                required
                margin="normal"
                multiline
                rows={5}
                placeholder="차량명과 연식 희망가격을 입력해주세요."
              />
            </FormControl>
          </Grid>
          <Grid container mt={2} className={classes.gridContainer}>
            <Grid item xs={12} md={12} lg={12} mt={2}>
              <Typography textAlign={"center"} mb={2} fontSize="16px">
                ☑️ 이용약관 및 개인정보 수집 이용 동의 절차
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} width={200}>
              <Box className={classes.formcheck}>dd</Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value={check1}
                    onChange={onCheckChange}
                    name="check1"
                  />
                }
                label="(필수) 이용 약관"
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} width={200}>
              <Box className={classes.formcheck}>dd</Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value={check2}
                    onChange={onCheckChange}
                    name="check2"
                  />
                }
                label="(필수) 개인정보 수집 및 이용에 대한 동의"
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>
          <Grid container mt={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                paddingTop: "25px",
                paddingBottom: "25px",
                fontSize: "20px",
                background: "#2E3B55",
              }}
              onClick={onSubmit}
              disabled={check1 && check2 ? false : true}
              // className={classes.button}
            >
              신청하기
            </Button>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Consult;

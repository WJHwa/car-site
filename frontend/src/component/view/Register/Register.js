import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  Button,
  Checkbox,
  Container,
  Grid,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  register_container: {
    marginTop: "50px",
    marginBottom: "50px",
    textAlign: "center",
    border: "0 solid #DBD7D7",
    borderTopWidth: "0.1px",
    borderLeftWidth: "0.1px",
    borderRadius: "10px 10px 10px 10px",
    WebkitBoxShadow: "27px 43px 43px -20px rgba(89,89,89,0.39)",
  },
  register_title: {
    marginTop: "25px",
    paddingBottom: "20px",
    fontWeight: "bolder",
    fontSize: "27px",
    borderBottom: "1px solid #DBD7D7",
  },
});

function Register() {
  const [Inputs, setInputs] = useState({
    id: "",
    password: "",
    repassword: "",
    name: "",
    phone: "",
    checked: false,
    checked1: false,
    checked2: false,
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }

  const { id, password, repassword, name, phone, checked, checked1, checked2 } =
    Inputs;

  const classes = styles();

  function onChangeInput(e) {
    const { name, value } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  }
  function onChangeCheck(e) {
    const { checked, name } = e.target;
    setInputs({
      ...Inputs,
      [name]: checked,
    });
  }

  async function onClick(e) {
    e.preventDefault();

    var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

    if (id === "") {
      return Alerts("아이디를 적어주세요.", "info");
    } else if (password === "") {
      return Alerts("비밀번호를 적어주세요.", "info");
    }
    if (password !== repassword) {
      return Alerts("비밀번호를 확인해주세요", "info");
    } else if (password.length > 8) {
      return Alerts("비밀번호는 8자에서 20자로 적어주세요.", "info");
    } else if (name === "") {
      return Alerts("이름을 적어주세요.", "info");
    } else if (phone === "") {
      return Alerts("전화번호는 필수입니다.", "info");
    } else if (!regPhone.test(phone)) {
      return Alerts("전화번호는 정확하게 입력해주세요.", "info");
    }

    let data = {
      name: name,
      phone: phone,
      id: id,
      password: password,
      checked: checked2,
    };

    const res = await axios.post("http://localhost:8080/register", data);
    if (res.data === "ID") {
      return Alerts("가입되어 있는 아이디가 있습니다.", "info");
    } else if (res.data) {
      Alerts("회원가입이 완료되었습니다.", "info");
      return navigate("/login", { replace: true });
    } else {
      return Alerts(
        "회원가입중 오류가 발생했습니다.다시 시도해주세요.",
        "info"
      );
    }
  }

  const value = [
    { label: "아이디", name: "id" },
    { label: "비밀번호", name: "password" },
    { label: "비밀번호 재확인", name: "repassword" },
    { label: "이름", name: "name" },
    { label: "전화번호 (-)빼고 적어주세요", name: "phone" },
  ];

  return (
    <>
      <Container maxWidth="lg">
        <Container maxWidth="md" className={classes.register_container}>
          <Typography className={classes.register_title}>회원가입</Typography>
          <Grid>
            <FormControl>
              {value.map((v, i) => {
                return (
                  <TextField
                    key={i}
                    label={v.label}
                    name={v.name}
                    type={
                      v.name === "password" || v.name === "repassword"
                        ? "password"
                        : "text"
                    }
                    placeholder={
                      v.name === "password"
                        ? "8자이상 20자이하로 작성해주세요."
                        : ""
                    }
                    margin="normal"
                    required
                    autoFocus
                    variant="standard"
                    onChange={onChangeInput}
                  />
                );
              })}
              <FormControlLabel
                control={<Checkbox name="checked" onChange={onChangeCheck} />}
                label="회원가입에 동의하십니까?"
                sx={{ mt: 1 }}
              />
              <FormControlLabel
                control={<Checkbox name="checked1" onChange={onChangeCheck} />}
                label="(필수)이용약관과 개인정보 수집 및 이용
               동의"
              />
              <FormControlLabel
                control={<Checkbox name="checked2" onChange={onChangeCheck} />}
                label="(선택) 이메일 및 SNS 마케팅 정보 수신 동의"
              />
              <Button
                type="submit"
                variant="outlined"
                disabled={!checked || !checked1 ? true : false}
                sx={{ mt: 3, mb: 5, p: 2 }}
                onClick={onClick}
              >
                회원가입
              </Button>
            </FormControl>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Register;

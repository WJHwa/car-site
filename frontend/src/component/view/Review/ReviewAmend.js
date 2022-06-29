import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Star, StarBorder } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const styles = makeStyles({
  starContainer: {
    border: "1px solid #F0F0F0",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
});

function ReviewAmend() {
  const [clicked, setClicked] = useState(null);
  const [id, setId] = useState("");
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AppContext);

  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  function addImages(e) {
    let nowSelectImage = e.target.files;

    let file = [];
    for (let i = 0; i < nowSelectImage.length; i++) {
      file.push(nowSelectImage[i]);
    }
    setImage([...file]);
  }

  async function retouchClick(e) {
    e.preventDefault();

    const data = {
      id: id,
      title: title,
      contents: contents,
      clicked: clicked,
    };

    await axios.put("/reviewamend", data);
    enqueueSnackbar("수정이 완료되었습니다..", {
      variant: "success",
    });
    return navigate("/review");
  }

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    for (const key of Object.keys(image)) {
      formData.append("file", image[key]);
    }
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    let data = {
      title: title,
      contents: contents,
      clicked: clicked,
      password: password,
      name: user.name,
      ids: user.ids,
    };
    formData.append("data", JSON.stringify(data));

    const res = await axios.post("/reviewamend", formData, config);
    if (!res.data) {
      return enqueueSnackbar(
        "후기작성중 오류가 발생했습니다. 다시 시도해주세요.",
        {
          variant: "info",
        }
      );
    } else {
      enqueueSnackbar("후기장성 완료되었습니다. 감사합니다.", {
        variant: "success",
      });
      return navigate("/review");
    }
  }

  useEffect(() => {
    if (location.state) {
      const { title, contents, satisfied, id } = location.state.list;
      setId(id);
      setContents(contents);
      setTitle(title);
      return setClicked(satisfied);
    }
  }, []);

  return (
    <>
      <Container
        component={"main"}
        maxWidth={"xl"}
        sx={{
          mb: 8,
          mt: 8,
        }}
      >
        {" "}
        <Grid borderBottom="1px solid #C2C2C2" mb={7} pb={5}>
          <Typography textAlign={"center"} fontSize="25px" fontWeight={"bold"}>
            판매 후기 쓰기
          </Typography>
        </Grid>
        <Container maxWidth="md">
          <Grid mb={3}>
            <Typography>작성자 : {user.name}</Typography>
          </Grid>
          <Grid mb={3}>
            <TextField
              fullWidth
              label="제목"
              required
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid className={classes.starContainer}>
            <Typography textAlign={"center"}>
              별점주기 :{" "}
              {[1, 2, 3, 4, 5].map((v) => (
                <Button key={v} size="small" onClick={() => setClicked(v)}>
                  {clicked >= v ? <Star /> : <StarBorder />}
                </Button>
              ))}
            </Typography>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              value={contents}
              label="후기내용"
              required
              margin="normal"
              multiline
              rows={6}
              onChange={(e) => setContents(e.target.value)}
            />
          </Grid>
          {!location.state ? (
            <Box>
              <Typography
                textAlign={"center"}
                fontWeight="bold"
                fontSize={"15px"}
              >
                비밀번호 설정
              </Typography>
              <Grid mb={3} display="flex" justifyContent={"center"}>
                {password.length > 8 ? (
                  <TextField
                    placeholder="8자리 까지만 설정해주세요."
                    type="password"
                    required
                    size="small"
                    value={password}
                    error
                    helperText="8자리 이하로 설정해주세요."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <TextField
                    placeholder="8자리 까지만 설정해주세요."
                    type="password"
                    required
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
              </Grid>
            </Box>
          ) : (
            <></>
          )}
          {!location.state ? (
            <Grid textAlign={"center"} mt={2}>
              <Typography fontWeight="bold" fontSize="20px" mb={2}>
                사진 첨부
              </Typography>
              <TextField
                onChange={addImages}
                type="file"
                inputProps={{
                  multiple: true,
                }}
                hidden
                fullWidth
              />
            </Grid>
          ) : (
            <></>
          )}
        </Container>
        <Grid display="flex" justifyContent="center" marginTop="30px">
          {!location.state ? (
            <Button
              variant="contained"
              color="success"
              sx={{ padding: "20px", pr: "30px", pl: "30px" }}
              onClick={onSubmit}
              disabled={
                clicked === null ||
                title === "" ||
                contents === "" ||
                password === ""
                  ? true
                  : false
              }
            >
              등록하기
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ padding: "20px", pr: "30px", pl: "30px" }}
              onClick={retouchClick}
              disabled={
                clicked === null || title === "" || contents === ""
                  ? true
                  : false
              }
            >
              수정하기
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default ReviewAmend;

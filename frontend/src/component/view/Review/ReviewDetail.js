import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import star from "../../../utils/star";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import axios from "axios";
import { Chat, Clear } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  container: {
    marginTop: 3,
    borderBottom: "1px solid #DFDFDF",
    borderTop: "2px solid black",
    background: "#F3F3F3",
  },
  star: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderBottom: "1px solid #DFDFDF",
    background: "#F3F3F3",
  },
  talk: {
    marginTop: "25px",
    borderBottom: "1px solid #DFDFDF",
    borderTop: "1px solid #DFDFDF",
    background: "#F3F3F3",
    display: "flex",
    justifyContent: "space-between",
  },
  talkname: {
    borderRight: "1px solid #DFDFDF",
    borderLeft: "1px solid #DFDFDF",
    paddingTop: 1.5,
    paddingBottom: 1.5,
    paddingRight: 4,
    paddingLeft: 4,
  },
  imageBox: {
    borderBottom: "1px solid #DFDFDF",
    paddingBottom: "25px",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    borderRight: "1px solid #DFDFDF",
    borderLeft: "1px solid #DFDFDF",
    paddingRight: "35px",
    paddingLeft: "35px",
    alignItems: "center",
    display: "flex",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "none",
    width: "500px",
    border: "2px solid #000",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
  },
});

function ReviewDetail() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState([]);
  const [pwd, setPwd] = useState("");
  const [commentText, setCommentText] = useState("");
  const num = useRef(12);

  const navigate = useNavigate();
  const classes = styles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { isLogin, user } = useContext(AppContext);

  async function commentOnClick(e) {
    e.preventDefault();
    const body = {
      text: commentText,
      name: user.name,
      idx: location.state,
    };

    const res = await axios.post(`/review/category/comment/:id`, body);
    if (res.data) {
      setCommentText("");
      return get();
    }
  }

  async function commentDelete(e, id) {
    e.preventDefault();

    await axios.delete(`/review/category/comment/${id}`);
    enqueueSnackbar("댓글을 삭제하였습니다.", {
      variant: "success",
    });
    return get();
  }

  async function reviewDelete(e) {
    e.preventDefault();
    const data = {
      id: list.id,
      pwd: pwd,
      password: list.password,
      ids: user.ids,
      image: images,
    };

    const result = await axios.post(`/review/category/delete`, data);
    if (result.data === "password") {
      setPwd("");
      return enqueueSnackbar("비밀번호를 다시 확인해주세요.", {
        variant: "info",
      });
    }
    enqueueSnackbar("후기를 삭제하였습니다.", {
      variant: "success",
    });
    setOpen(false);
    return navigate("/review");
  }

  async function get() {
    num.current++;
    const res = await axios.get(`/review/category/${location.state}`);
    if (!res.data) {
      return enqueueSnackbar("판매후기 불러오는중에 오류가 발생했습니다.", {
        variant: "info",
      });
    } else {
      let image = [];
      let result = [];
      image.push(
        res.data[0].list.image0,
        res.data[0].list.image1,
        res.data[0].list.image2
      );
      for (let i = 0; i < image.length; i++) {
        if (!image[i]) {
          break;
        } else {
          result.push(image[i]);
        }
      }
      setImages(result);
      setComment(res.data[1].comment);
      setPwd("");
      setCommentText("");
      return setList(res.data[0].list);
    }
  }

  useEffect(() => {
    get();

    return () => {};
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
        <Container maxWidth="lg">
          <Grid className={classes.container}>
            <Typography fontWeight="bold" fontSize="20px" ml={3} mb={2} mt={2}>
              {list.title}
            </Typography>
            <Typography fontSize={"11px"} color="text.secondary" ml={3} mb={2}>
              *{list.id}* · {list.date && list.date.slice(0, 10)} · 조회 :
              {list.views}
            </Typography>
          </Grid>
          <Grid className={classes.star}>
            <Box>
              <Typography ml={3} fontSize={"15px"}>
                고객만족도 : {star(list.satisfied)}
              </Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" fontSize={"14px"} mr={3}>
                작성자 : {list.writer && list.writer.slice(0, 1)}**
              </Typography>
            </Box>
          </Grid>
          <Box className={classes.imageBox}>
            {images.map((row) => (
              <Box
                key={row}
                component={"img"}
                sx={{
                  backgroundImage: `url(http://localhost:8080/${row})`,
                  width: "100%",
                  height: "500px",
                  backgroundPosition: "center",
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  marginBottom: "30px",
                }}
              />
            ))}

            <Typography mt={2}>{list.contents}</Typography>
          </Box>
          <Grid className={classes.talk}>
            <Typography fontWeight="bold" sx={{ mt: 2, mb: 2, ml: 2 }}>
              <Chat fontSize="inherit" sx={{ mr: 0.3 }} />
              댓글[{comment.length > 0 ? comment.length : 0}]
            </Typography>
          </Grid>
          {comment.length > 0 ? (
            comment.map((v) => (
              <Grid
                key={v.id}
                container
                sx={{
                  borderBottom: "1px solid #DFDFDF",
                }}
              >
                <Box className={classes.commentBox}>
                  <Typography fontSize="14px" fontWeight="bolder">
                    {v.writer}
                  </Typography>
                </Box>
                <Grid
                  item
                  pt={1}
                  pb={1}
                  pr={4}
                  ml={4}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize="14px">{v.title}</Typography>
                </Grid>

                {user.name === v.writer ? (
                  <IconButton
                    aria-label="retouch"
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                    onClick={(e) => {
                      commentDelete(e, v.id);
                    }}
                  >
                    <Clear
                      fontSize="small"
                      sx={{
                        color: "#E0E0E0",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </IconButton>
                ) : (
                  <></>
                )}
              </Grid>
            ))
          ) : (
            <Grid
              container
              sx={{
                borderBottom: "1px solid #DFDFDF",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid />
              <Grid item pt={5} pb={5} ml={4}>
                <Typography fontSize="15px">댓글이 없습니다.</Typography>
              </Grid>
            </Grid>
          )}
          <Grid container display={"flex"}>
            <Grid item lg={10} md={10} xs={9}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={isLogin ? false : true}
                placeholder={isLogin ? "" : "로그인 후 이용 가능합니다."}
              />
            </Grid>
            <Grid item lg={2} md={2} xs={3}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ height: "100%" }}
                disabled={isLogin ? false : true}
                onClick={commentOnClick}
              >
                댓글쓰기
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
          >
            {list.writer === user.name ? (
              <Grid item mt={3}>
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  onClick={() =>
                    navigate("/reviewamend", {
                      state: {
                        list,
                      },
                    })
                  }
                >
                  수정
                </Button>
                <Button
                  size="small"
                  color="warning"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                >
                  삭제
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Container>
      </Container>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          backgroundColor: "rgba(76, 76, 76, 0.7)",
        }}
      >
        <Box className={classes.modal}>
          <Typography variant="h6" component="h2" mb={1}>
            정말 삭제하시겠습니까?
          </Typography>
          <Typography color="text.secondary" fontSize={"14px"} mb={3}>
            * 후기 작성시 설정했던 비밀번호를 입력해주세요. *
          </Typography>
          <TextField
            type="text"
            label={"비밀번호"}
            value={pwd}
            size="small"
            onChange={(e) => setPwd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent={"space-evenly"}>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={reviewDelete}
            >
              삭제
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={() => setOpen(false)}
            >
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ReviewDetail;

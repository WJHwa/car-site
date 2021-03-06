import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import {
  getOriginList,
  getSeriesList,
  getModelList,
} from "../../../utils/getList";
import Slider from "react-slick";
import banner from "../../../img/banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const styled = makeStyles({
  containers: {
    background: "#F0F0F0",
    marginTop: "20px",
    paddingBottom: "10px",
    marginBottom: "30px",
    borderRadius: 10,
    maxWidth: 1300,
    WebkitBoxShadow: "6px 6px 20px 6px rgba(100,100,100,0.39)",
  },
  searchbutton: {
    paddingRight: "100px",
    paddingLeft: "100px",
    paddingTop: "15px",
    paddingBottom: "15px",
    fontSize: "18px",
  },
  containertypo: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  promiseContainer: {
    background: "white",
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "25px",
    paddingBottom: "35px",
    fontSize: "16px",
  },
  promiseTitle: {
    textAlign: "center",
    fontWeight: "bolder",
    paddingTop: "15px",
    paddingBottom: "10px",
    marginBottom: "15px",
    fontSize: "20px",
  },
  title: {
    textAlign: "center",
    paddingTop: "15px",
    fontSize: "23px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  menu: {
    margin: "8px",
    width: "180px",
  },
  smMenu: {
    margin: "8px",
    width: "120px",
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 200,
    },
  },
};

function Home() {
  const [origin, setOrgin] = useState("");
  const [produce, setProduce] = useState("");
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [produceList, setProduceList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [korea, setKorea] = useState([]);
  const [foreign, setForeign] = useState([]);
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const { LgMedio, MdMedio, SmMedio } = useContext(AppContext);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const classes = styled();

  var settings = {
    infinite: true,
    speed: 1800,
    autoplay: true,
    slidesToShow: SmMedio ? 1 : MdMedio ? 2 : LgMedio ? 3 : 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  const data = [
    {
      name: "origin",
      value: origin,
    },
    { name: "produce", value: produce },
    { name: "series", value: series },
    { name: "model", value: model },
  ];

  async function get() {
    const res = await axios.get("/carlist");
    if (!res.data) {
      return enqueueSnackbar(
        "??????????????? ???????????? ??? ????????? ??????????????????.?????? ??????????????????.",
        {
          variant: "info",
        }
      );
    }
    setKorea(res.data.korea[0]);
    setForeign(res.data.foreign);
    setReview(res.data.review[0].filter((v) => v.id !== 1));
  }

  useEffect(() => {
    setLoading(true);
    get();

    return () => setLoading(false);
  }, [enqueueSnackbar]);

  return (
    <>
      <Box
        sx={{
          background: "#FDD431",
          mt: 0.2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={banner}
          style={{
            width: SmMedio ? "370px" : MdMedio ? "500px" : "600px",
            background: "none",
          }}
        />
      </Box>
      <Container component={"main"} maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Container className={classes.containers}>
          <Typography
            fontWeight={"bold"}
            fontSize="23px"
            className={classes.containertypo}
          >
            ????????? ????????????
          </Typography>
          <Grid container spacing={2} textAlign="center">
            <Grid item xs={6} md={4} lg={3}>
              <FormControl
                variant="standard"
                size={"small"}
                className={SmMedio ? classes.smMenu : classes.menu}
              >
                <InputLabel>????????????</InputLabel>
                <Select
                  name="origin"
                  onChange={(e) => {
                    setOrgin(e.target.value);
                    setProduceList(getOriginList(e.target.value));
                  }}
                  value={origin}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <FormControl
                variant="standard"
                size={"small"}
                className={SmMedio ? classes.smMenu : classes.menu}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  name="produce"
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    setProduce(e.target.value);
                    setSeriesList(getSeriesList(e.target.value));
                  }}
                  value={produce}
                >
                  {produceList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <FormControl
                variant="standard"
                size={"small"}
                className={SmMedio ? classes.smMenu : classes.menu}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  name="series"
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    setSeries(e.target.value);
                    setModelList(getModelList(e.target.value));
                  }}
                  value={series}
                >
                  {seriesList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <FormControl
                variant="standard"
                size={"small"}
                className={SmMedio ? classes.smMenu : classes.menu}
              >
                <InputLabel>?????????</InputLabel>
                <Select
                  name="model"
                  MenuProps={MenuProps}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  {modelList.map((v) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid display={"flex"} justifyContent={"center"} mt={4} mb={1}>
            <Button
              variant="contained"
              size="large"
              color="success"
              sx={{
                paddingRight: "100px",
                paddingLeft: "100px",
                paddingTop: "15px",
                paddingBottom: "15px",
                fontSize: "18px",
              }}
              onClick={() =>
                navigate("/productlist", {
                  state: data,
                })
              }
            >
              ????????????
            </Button>
          </Grid>
        </Container>

        <Container className={classes.containers}>
          <Typography
            sx={{
              textAlign: "center",
              paddingTop: "15px",
              fontSize: "23px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            ????????? ????????????
          </Typography>
          <Container
            sx={{
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <Slider {...settings}>
              {korea.map((v) => (
                <Grid
                  key={v.date}
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  sx={{
                    height: "280px",
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      border: "2px solid #FDD431",
                      height: "320px",
                      width: SmMedio
                        ? "275px"
                        : MdMedio
                        ? "230px"
                        : LgMedio
                        ? "250px"
                        : "270px",
                    }}
                    onClick={() =>
                      navigate(`/productlist/category=${v.km}`, { state: v })
                    }
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={160}
                        image={v.thumbnail_image}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          fontSize={
                            SmMedio
                              ? "20px"
                              : MdMedio
                              ? "18px"
                              : LgMedio
                              ? "19px"
                              : "20px"
                          }
                          fontWeight={"bold"}
                        >
                          ??????{v.produce} {v.series}??????
                        </Typography>
                        <Typography
                          fontSize={"10px"}
                          color="text.secondary"
                          mb={1}
                        >
                          {v.year} {Number(v.km).toLocaleString()}km {v.fuel}{" "}
                          {v.gear}
                        </Typography>
                        <Typography
                          color={"#FDD431"}
                          fontSize={
                            SmMedio
                              ? "20px"
                              : MdMedio
                              ? "18px"
                              : LgMedio
                              ? "19px"
                              : "20px"
                          }
                          fontWeight="bold"
                        >
                          {v.price}??????/???{v.month}??????(??????)
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Container>
          <Grid mt={2} mb={2} display="flex" justifyContent={"center"}>
            <Button
              size="large"
              color="success"
              variant="contained"
              onClick={() =>
                navigate("/productlist", {
                  state: [
                    {
                      name: "origin",
                      value: "??????",
                    },
                    { name: "produce", value: produce },
                    { name: "series", value: series },
                    { name: "model", value: model },
                  ],
                })
              }
            >
              ??? ??????
            </Button>
          </Grid>
        </Container>
        <Container className={classes.containers}>
          <Typography
            className={classes.title}
            sx={{
              textAlign: "center",
              paddingTop: "15px",
              fontSize: "23px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            ????????? ????????????
          </Typography>
          <Container sx={{ marginTop: "20px", marginBottom: "40px" }}>
            <Slider {...settings}>
              {foreign.map((v) => (
                <Grid
                  key={v.date}
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  sx={{
                    height: "280px",
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      border: "2px solid #FDD431",
                      height: "320px",
                      width: SmMedio
                        ? "275px"
                        : MdMedio
                        ? "230px"
                        : LgMedio
                        ? "250px"
                        : "270px",
                    }}
                    onClick={() =>
                      navigate(`/productlist/category=${v.km}`, { state: v })
                    }
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={160}
                        image={v.thumbnail_image}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          fontSize={
                            SmMedio
                              ? "20px"
                              : MdMedio
                              ? "18px"
                              : LgMedio
                              ? "19px"
                              : "20px"
                          }
                          fontWeight={"bold"}
                        >
                          ??????{v.produce} {v.series}??????
                        </Typography>
                        <Typography
                          fontSize={"10px"}
                          color="text.secondary"
                          mb={1}
                        >
                          {v.year} {Number(v.km).toLocaleString()}km {v.fuel}{" "}
                          {v.gear}
                        </Typography>
                        <Typography
                          color={"#FDD431"}
                          fontSize={
                            SmMedio
                              ? "20px"
                              : MdMedio
                              ? "18px"
                              : LgMedio
                              ? "19px"
                              : "20px"
                          }
                          fontWeight="bold"
                        >
                          {v.price}??????/???{v.month}??????(??????)
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Container>
          <Grid mt={2} mb={2} display="flex" justifyContent={"center"}>
            <Button
              size="large"
              color="success"
              variant="contained"
              onClick={() =>
                navigate("/productlist", {
                  state: [
                    {
                      name: "origin",
                      value: "??????",
                    },
                    { name: "produce", value: produce },
                    { name: "series", value: series },
                    { name: "model", value: model },
                  ],
                })
              }
            >
              ??? ??????
            </Button>
          </Grid>
        </Container>
        <Container className={classes.containers}>
          <Typography
            className={classes.title}
            sx={{
              textAlign: "center",
              paddingTop: "15px",
              fontSize: "23px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            ?????????????????? ??????
          </Typography>
          <Container
            sx={{
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <Slider {...settings}>
              {review.map((v) => (
                <Grid item xs={12} md={6} lg={3} key={v.date} ml={"2px"}>
                  <Card
                    sx={{
                      height: "320px",
                      width: SmMedio
                        ? "275px"
                        : MdMedio
                        ? "230px"
                        : LgMedio
                        ? "250px"
                        : "270px",
                    }}
                    onClick={() =>
                      navigate(`/review/category=${v.id}}`, {
                        state: v.id,
                      })
                    }
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={160}
                        image={v.image0}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          fontWeight={"bolder"}
                        >
                          {v.title.length > 12
                            ? `${v.title.slice(0, 12)}..`
                            : v.title}
                        </Typography>
                        <Typography variant="body1" mb={3.5}>
                          {v.contents.length > 18
                            ? `${v.contents.slice(0, 18)}..`
                            : v.contents}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          fontSize={"11px"}
                          mb={-1}
                        >
                          {v.writer && v.writer.slice(0, 1)}..{" "}
                          {v.date && v.date.slice(0, 10)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Container>
          <Grid mt={2} mb={2} display="flex" justifyContent={"center"}>
            <Button
              size="large"
              color="success"
              variant="contained"
              onClick={() => navigate("/review")}
            >
              ??? ??????
            </Button>
          </Grid>
        </Container>

        <Grid container spacing={1} mt={4} mb={4}>
          {[
            {
              num: "33,322???",
              name: "??? ????????????",
            },
            {
              num: "1,210???",
              name: "????????? ????????????",
            },
            {
              num: "215???",
              name: "?????????",
            },
            {
              num: "341???",
              name: "?????????",
            },
          ].map((a) => {
            return (
              <Grid
                item
                key={a.name}
                xs={6}
                md={4}
                lg={3}
                sx={{
                  textAlign: "center",
                  border: "2px solid #F0F0F0",
                  pb: 1,
                  borderRadius: "10px",
                }}
              >
                {a.name}
                <Typography mt={1} fontSize={23}>
                  {a.num}
                </Typography>
              </Grid>
            );
          })}
        </Grid>

        <Container
          sx={{
            pt: 2,
            pb: 4,
            border: "2px solid #F0F0F0",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography mb={2} fontWeight="bolder" fontSize={"20px"}>
            ?????? ?????? ???????????? ??????
          </Typography>
          <Typography fontSize={"15px"} fontWeight={"bold"}>
            ????????? ?????? ?????????????????? ??? ????????? ????????? ?????? ?????????????????????
          </Typography>
          <Typography fontSize={"12px"} color="gray" mb={3}>
            ???????????? ?????? ??????????????? ??????????????? ??????????????? ????
          </Typography>
          <Container
            maxWidth="lg"
            sx={{ background: "#FDFBF6", borderRadius: "15px", pt: 2, pb: 2 }}
          >
            <Typography fontSize="17px" fontWeight="bolder" mb={1}>
              ????????????
            </Typography>
            <Grid item display="flex" justifyContent={"center"} mb={2}>
              <Avatar sx={{ background: "#FDD431" }}>
                <DirectionsCarIcon />
              </Avatar>
            </Grid>
            <Typography fontSize="14px" fontWeight="bolder">
              ???????????? ??? , ?????? ???{" "}
            </Typography>
            <Typography fontSize="14px" fontWeight="bolder" mb={4}>
              ????????? ?????? ?????? ????????? ?????? ??????
            </Typography>
            {[
              "???? ???????????? : ???????????? ?????? ?????????????????? ?????? ???????????? ????????? ?????? ???????????? ?????? ???????????? ?????? ????????????",
              "???? ????????? : ???????????? ?????? ???????????? ????????? ?????? ???????????? ?????? ???????????? ?????? ????????????",
              "???? ????????? ????????? ????????? ???????????? ???????????????.",
              "???? ??????????????? ??????????????? ???????????????. ????????? ??????????????????.",
            ].map((v) => {
              return (
                <Typography fontSize="12px" mb={1} key={v}>
                  {v}
                </Typography>
              );
            })}
          </Container>
        </Container>
        <Container sx={{ mt: 4, pb: 2, mb: 6, background: "#F0F0F0" }}>
          <Typography
            className={classes.promiseTitle}
            sx={{
              textAlign: "center",
              fontWeight: "bolder",
              paddingTop: "15px",
              paddingBottom: "10px",
              marginBottom: "15px",
              fontSize: "20px",
            }}
          >
            ???? ??????????????? ?????????????????? ????
          </Typography>
          <Grid container spacing={1} className={classes.promiseContainer}>
            {[
              " ???? 1. ???????????? ???????????? ?????? ??? ??? ?????? ??????????????? ???????????????.",
              "???? 2. ????????? ??????,????????? ???????????? ??????????????????.",
              "???? 3. ?????? ??????,?????? ???????????? ????????? ???????????? ????????? ??????????????????.",
              " ???? 4. 24?????? ????????? ??????????????? ???????????? ????????? ????????? ?????? ????????????????????????.",
            ].map((v) => {
              return (
                <Grid
                  item
                  xs={12}
                  lg={5}
                  md={5}
                  m={1}
                  fontWeight="bold"
                  key={v}
                >
                  {v}
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Home;

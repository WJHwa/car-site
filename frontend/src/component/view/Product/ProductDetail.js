import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Grid, Box, Button, Link } from "@mui/material";
import { AppContext } from "../../../App";
import Slider from "react-slick";
import { CheckBox, Download } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const styles = makeStyles({
  ProductDetail_description: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "10px",
    marginLeft: "10px",
    paddingBottom: "15px",
    paddingTop: "10px",
    borderBottom: "1px solid #F0F0F0",
  },
  ProductDetail_button: {
    marginTop: "20px",
    borderRadius: "10px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  ProductDetail_boximage: {
    height: "350px",
    maxWidth: "400px",
    overflow: "hidden",
    width: "100%",
  },
  ProductDetail_detail: {
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ProductDetail_option: {
    border: "2px solid #F0F0F0",
    borderRadius: "10px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  ProductDetail_optiontitle: {
    textAlign: "center",
    fontWeight: "bolder",
    paddingBottom: "13px",
    paddingTop: "13px",
    borderBottom: "1px solid #F0F0F0",
  },
  ProductDetail_fileContainer: {
    border: "2px solid #F0F0F0",
    borderRadius: "10px",
    marginBottom: "30px",
    marginTop: "20px",
  },
  ProductDetail_fileTitle: {
    textAlign: "center",
    fontWeight: "bolder",
    paddingBottom: "13px",
    paddingTop: "13px",
    borderBottom: "1px solid #F0F0F0",
  },
  ProductDetail_fileLink: {
    textDecoration: "none",
    display: "flex",
    marginBottom: "10px",
  },
});

function ProductDetail() {
  const [list, setList] = useState([]);
  const [image, setImage] = useState([]);
  const [perfomance, setPerfomance] = useState("");
  const { SmMedio } = useContext(AppContext);

  const location = useLocation();
  const classes = styles();
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    arrows: false,
    // autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  const datas = [
    { name: "????????????", value: list.car_num },
    { name: "??????", value: list.year },
    { name: "?????????", value: list.km },
    { name: "??????", value: list.color },
    { name: "??????", value: list.fuel },
    { name: "??????", value: list.size },
    { name: "??????", value: list.gear },
    { name: "????????????", value: list.accident },
    { name: "????????????", value: "??????" },
    { name: "??????/??????", value: "??????" },
  ];

  useEffect(() => {
    if (location.state) {
      setList(location.state);
    }
    (async function post() {
      let data = [];
      const res = await axios.post("/productdetail", {
        car_num: location.state.car_num,
      });
      data.push(
        res.data[0].image0,
        res.data[0].image1,
        res.data[0].image2,
        res.data[0].image3,
        res.data[0].image4,
        res.data[0].image5,
        res.data[0].image6,
        res.data[0].image7,
        res.data[0].image8,
        res.data[0].image9,
        res.data[0].image10
      );
      data = data.filter((v) => v !== null);
      setPerfomance(res.data[0].performance_image);
      return setImage([...data]);
    })();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          {list.origin}({list.produce})
        </Typography>
        <Typography variant="h4" fontWeight={"bolder"} mb={1}>
          {list.series} ({list.model})
        </Typography>
        <Grid container pb={1} borderBottom={"2px solid black"}>
          <Typography color="text.secondary" variant="body2" mr={1}>
            ????????? : {list.date && list.date.slice(0, 10)}
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            ????????? : {Number(list.km).toLocaleString()}km
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            ?????? : {list.fuel}
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            ?????? : {list.color}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            marginTop: "20px",
            paddingBottom: "30px",
            borderBottom: "2px solid #F0F0F0",
          }}
        >
          <Grid item lg={1} sm={1} xs={0} />
          <Grid
            item
            lg={5}
            sm={5}
            xs={12}
            sx={{ marginBottom: SmMedio ? 5 : 0 }}
          >
            <Slider {...settings}>
              {image.map((v) => (
                <Box
                  key={v}
                  component={"img"}
                  sx={{
                    backgroundPosition: "center",
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: 400,
                    maginBottom: 1,
                    backgroundImage: `url(http://localhost:8080/${v})`,
                  }}
                />
              ))}
            </Slider>
          </Grid>
          <Grid item lg={1} sm={1} xs={0} />
          <Grid
            item
            lg={5}
            sm={5}
            xs={12}
            sx={{
              border: "2px solid #F0F0F0",
              borderRadius: "10px",
            }}
          >
            <Grid className={classes.ProductDetail_description}>
              <Typography variant="h5" fontWeight="bolder">
                ?????????(?????????)
              </Typography>
              <Typography color="#FDD431" variant="h6" fontWeight="bolder">
                {list.price}?????? (??? {list.month}???)
              </Typography>
            </Grid>
            {datas.map((v) => (
              <Grid
                key={v.name}
                ml="10px"
                marginTop={v.name === "????????????" ? "15px" : "2px"}
                display="flex"
              >
                <Typography>{v.name} : </Typography>
                <Typography fontWeight={"bold"} ml={2}>
                  {v.name === "?????????"
                    ? `${Number(v.value).toLocaleString()}km`
                    : v.value}
                </Typography>
              </Grid>
            ))}

            <Button
              color="success"
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
                borderRadius: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              ?????? ????????????
            </Button>
          </Grid>
        </Grid>
        <Box className={classes.ProductDetail_detail}>
          {image.map((v) => (
            <Box
              key={v}
              sx={{
                backgroundPosition: "center",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "600px",
                mb: 3,
                backgroundImage: `url(http://localhost:8080/${v})`,
              }}
            />
          ))}
          <Typography>{list.contents}</Typography>
        </Box>
        <Grid className={classes.ProductDetail_option}>
          <Typography
            className={classes.ProductDetail_optiontitle}
            variant="h6"
          >
            ????????????
          </Typography>
          <Grid container component={"main"} sx={{ mt: 2 }}>
            <Grid
              container
              marginBottom="15px"
              display="flex"
              justifyContent={"center"}
            >
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ??????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ?????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ????????? ???
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ??????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                HID?????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ???
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ????????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                ?????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ECM?????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ABS
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ECS
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ESP
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                TCS
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                GPS
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ???????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                DMB
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????????????????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ??????
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ????????????
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.ProductDetail_fileContainer}>
          <Typography variant="h6" className={classes.ProductDetail_fileTitle}>
            ????????????
          </Typography>
          <Grid ml={2} mt={2} mb={2}>
            <Link
              href={`http://localhost:8080/${perfomance}`}
              target="_blank"
              sx={{
                textDecoration: "none",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              ???????????????
              <Download fontSize="small" />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetail;

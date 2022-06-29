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
    { name: "차량번호", value: list.car_num },
    { name: "연식", value: list.year },
    { name: "키로수", value: list.km },
    { name: "색상", value: list.color },
    { name: "연료", value: list.fuel },
    { name: "차종", value: list.size },
    { name: "기어", value: list.gear },
    { name: "사고유무", value: list.accident },
    { name: "세금미납", value: "없음" },
    { name: "압류/저당", value: "없음" },
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
            등록일 : {list.date && list.date.slice(0, 10)}
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            키로수 : {Number(list.km).toLocaleString()}km
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            연료 : {list.fuel}
          </Typography>
          <Typography color="text.secondary" variant="body2" mr={1}>
            색상 : {list.color}
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
                차량가(할부시)
              </Typography>
              <Typography color="#FDD431" variant="h6" fontWeight="bolder">
                {list.price}만원 (월 {list.month}만)
              </Typography>
            </Grid>
            {datas.map((v) => (
              <Grid
                key={v.name}
                ml="10px"
                marginTop={v.name === "차량번호" ? "15px" : "2px"}
                display="flex"
              >
                <Typography>{v.name} : </Typography>
                <Typography fontWeight={"bold"} ml={2}>
                  {v.name === "키로수"
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
              차량 문의하기
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
            옵션정보
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
                썬팅
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                썬루프
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                루프캐리어
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                알로이 휠
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                튜닝
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                제논라이트
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                HID라이트
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                휠
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                파워핸들
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                파워윈도우
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                풀오토에어컨
              </Typography>
              <CheckBox />
              <Typography mr={1.5} mb={1}>
                에어컨
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                전동식백밀러
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                전동시트
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                열선시트
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                가죽시트
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                ECM룸밀러
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                핸들리모컨
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                스마트키
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                메탈그레인
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                우드그레인
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                운전석에어백
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                조수석에어백
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                사이드에어백
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                커튼에어백
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
                전후방감지기
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                후방카메라
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                네비게이션
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                GPS
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                어라운드뷰
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                튜닝스피커
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                DMB
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                우퍼
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                리어스포일러
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                크루즈컨트롤
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                배기
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                흡기
              </Typography>
              <CheckBox />
              <Typography mr={1} mb={1}>
                에어서스
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.ProductDetail_fileContainer}>
          <Typography variant="h6" className={classes.ProductDetail_fileTitle}>
            첨부파일
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
              성능기록부
              <Download fontSize="small" />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetail;

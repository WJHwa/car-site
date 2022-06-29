import React, { useContext } from "react";
import {
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Typography,
  Container,
} from "@mui/material";
import { AppContext } from "../../../App";
import Slider from "react-slick";
import { makeStyles } from "@mui/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const styles = makeStyles({
  suggestion: {
    paddingTop: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    marginBottom: "40px",
    paddingBottom: "15px",
    maxWidth: 1200,
    background: "#F0F0F0",
    WebkitBoxShadow: "6px 6px 20px 6px rgba(100,100,100,0.39)",
  },
  suggestionItems: {
    marginTop: "20px",
    marginBottom: "30px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
});

function ImgSlider({ list }) {
  const classes = styles();
  const { LgMedio, MdMedio, SmMedio } = useContext(AppContext);
  var settings = {
    infinite: true,
    arrows: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: SmMedio ? 1 : MdMedio ? 2 : LgMedio ? 3 : 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <>
      <Container maxWidth="xl" className={classes.suggestion}>
        <Grid pb={2} borderBottom="1px solid #F0F0F0" textAlign={"center"}>
          <Typography variant="h5" fontWeight={"bold"}>
            오늘의 추천
          </Typography>
        </Grid>
        <Grid className={classes.suggestionItems}>
          <Slider {...settings}>
            {list.map((v) => (
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
                    marginLeft: SmMedio ? "30px" : "0px",
                  }}
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
                        ❗️{v.produce} {v.series}❗️
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
                        {v.price}만원/월{v.month}만원(할부)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Slider>
        </Grid>
      </Container>
    </>
  );
}

export default ImgSlider;

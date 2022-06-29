import React from "react";
import { Box, Container, Link, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img from "../../../img/footer.png";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  link: {
    color: "#606060",
    marginLeft: "20px",
    marginRight: "10px",
    textDecoration: "none",
  },
  logo: {
    backgroundImage: `url(${img})`,
    width: "290px",
    height: "95px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    marginBottom: "5px",
    cursor: "pointer",
    borderRadius: "5px",
  },
});

function Footer() {
  const navigate = useNavigate();
  const classes = styles();
  return (
    <>
      <Grid
        container
        mb={2}
        pt={1}
        pb={1}
        borderTop="1px solid #C0C0C0"
        borderBottom="1px solid #C0C0C0"
      >
        {["홈", "회사소개", "이용약관", "개인정보취급방침"].map((v) => {
          return (
            <Box className={classes.link} key={v}>
              <Link variant="caption" sx={{ textDecoration: "none" }}>
                {v}
              </Link>
            </Box>
          );
        })}
      </Grid>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Grid container>
          <Box
            component={"img"}
            className={classes.logo}
            onClick={() => navigate("/")}
          />
        </Grid>
        <Grid container mb={2} width="92%">
          <Typography variant="h3" color="grey" fontSize={"12px"}>
            상호명 : 왕중고차 &#183; 대표 : 원종화 &#183; 전화 : 고객센터 번호
            032-111-1111 &#183; 팩스 : 032-222-4022 &#183; 주소 : 인천광역시
            남동구 논현1동 <br />
            사업자 번호 : 231-2112-12345
          </Typography>
        </Grid>
        <Link variant="caption" sx={{ color: "black", textDecoration: "none" }}>
          WonCar Inc. All rights reserved.
        </Link>
      </Container>
    </>
  );
}

export default Footer;

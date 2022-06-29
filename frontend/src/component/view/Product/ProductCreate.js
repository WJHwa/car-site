import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getOriginList,
  getSeriesList,
  getModelList,
} from "../../../utils/getList";
import { useSnackbar } from "notistack";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
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
    display: "flex",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    marginTop: "15px",
    paddingBottom: "15px",
    fontWeight: "bold",
  },
  button: {
    paddingTop: "25px",
    paddingBottom: "25px",
    fontSize: "20px",
    background: "#2E3B55",
  },
  menu: {
    margin: "8px",
    minWidth: "180px",
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

function ProductCreate() {
  const [origin, setOrgin] = useState("");
  const [produce, setProduce] = useState("");
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [size, setSize] = useState("");
  const [gear, setGear] = useState("");
  const [produceList, setProduceList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [inputs, setInputs] = useState({
    year: "",
    fuel: "",
    accident: "",
    color: "",
    price: "",
    km: "",
    month: "",
    car_num: "",
    contents: "",
  });
  const [image, setImage] = useState([]);

  const { price, year, color, fuel, km, month, car_num, accident, contents } =
    inputs;

  const navigate = useNavigate();
  const classes = styles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  function onChangeInput(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const values = [
    { name: "차량번호", values: "car_num", value: car_num },
    { name: "가격", values: "price", value: price },
    { name: "연식", values: "year", value: year },
    { name: "색상", values: "color", value: color },
    { name: "연료", values: "fuel", value: fuel },
    { name: "키로수", values: "km", value: km },
    { name: "할부시", values: "month", value: month },
    { name: "사고유무", values: "accident", value: accident },
  ];

  function addImages(e) {
    let nowSelectImage = e.target.files;

    let file = [];
    for (let i = 0; i < nowSelectImage.length; i++) {
      file.push(nowSelectImage[i]);
    }
    setImage([...file]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    let kms = km.replace(",", "");
    if (kms !== km) {
      return enqueueSnackbar("키로수란에 ',' 없이 작성해주세요.", {
        variant: "info",
      });
    }
    let data = {
      price,
      year,
      color,
      fuel,
      km,
      month,
      car_num,
      accident,
      contents,
      origin,
      series,
      model,
      produce,
      size,
      gear,
    };
    let formData = new FormData();

    for (const key of Object.keys(image)) {
      formData.append("file", image[key]);
    }
    formData.append("data", JSON.stringify(data));

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const res = await axios.post("/productCreate", formData, config);
    if (res.data) {
      enqueueSnackbar("등록에 성공했습니다.", { variant: "success" });
      return navigate("/admin/carlist");
    } else {
      return enqueueSnackbar("등록중 오류가 발생했습니다.", {
        variant: "info",
      });
    }
  }

  async function retouch(e) {
    e.preventDefault();

    let data = {
      price,
      year,
      color,
      fuel,
      km,
      month,
      car_num,
      accident,
      contents,
      origin,
      series,
      model,
      produce,
      size,
      gear,
    };

    const res = await axios.put("/productCreate", data);
    if (!res.data) {
      return enqueueSnackbar("수정중 오류가 발생했습니다.", {
        variant: "info",
      });
    }
    enqueueSnackbar("수정 하였습니다.", { variant: "success" });
    return navigate("/admin/carlist");
  }

  useEffect(() => {
    if (location.state) {
      const {
        accident,
        car_num,
        color,
        contents,
        fuel,
        gear,
        km,
        origin,
        price,
        size,
        year,
        series,
        model,
        produce,
      } = location.state;
      setInputs({
        ...inputs,
        ["car_num"]: car_num,
        ["color"]: color,
        ["contents"]: contents,
        ["fuel"]: fuel,
        ["km"]: km,
        ["month"]: month,
        ["price"]: price,
        ["year"]: year,
        ["accident"]: accident,
      });
      setOrgin(origin);
      setSize(size);
      setGear(gear);
      setProduceList(getOriginList(origin));
      setProduce(produce);
      setSeriesList(getSeriesList(produce));
      setSeries(series);
      setModelList(getModelList(series));
      setModel(model);
    }
  }, []);

  return (
    <>
      <Container component={"main"} maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        <Container maxWidth={"md"} className={classes.container}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "22px",
              marginTop: "15px",
              paddingBottom: "15px",
              fontWeight: "bold",
            }}
          >
            차량 등록
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{
              marginTop: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
              marginBottom: "20px",
              background: "white",
              borderRadius: "15px",
              display: "flex",
              textAlign: "center",
            }}
          >
            <Grid item xs={6} md={3} lg={6}>
              <Typography>국산수입</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>국산수입</InputLabel>
                <Select
                  onChange={(e) => {
                    setOrgin(e.target.value);
                    setProduceList(getOriginList(e.target.value));
                  }}
                  value={origin}
                >
                  <MenuItem value="국산">국산</MenuItem>
                  <MenuItem value="수입">수입</MenuItem>
                  <MenuItem value="화물">화물</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>제조사</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>제조사</InputLabel>
                <Select
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
            <Grid item xs={6} md={3} lg={6}>
              <Typography>시리즈</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>시리즈</InputLabel>
                <Select
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
            <Grid item xs={6} md={3} lg={6}>
              <Typography>모델명</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>모델명</InputLabel>
                <Select
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
            <Grid item xs={6} md={3} lg={6}>
              <Typography>크기</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>크기</InputLabel>
                <Select
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  value={size}
                >
                  <MenuItem value="소형">소형</MenuItem>
                  <MenuItem value="준중형">준중형</MenuItem>
                  <MenuItem value="중형">중형</MenuItem>
                  <MenuItem value="대형">대형</MenuItem>
                  <MenuItem value="경차">경차</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="스포츠카">스포츠카</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <Typography>변속기</Typography>
              <FormControl
                variant="standard"
                size={"small"}
                sx={{ margin: "8px", minWidth: "180px" }}
              >
                <InputLabel>변속기</InputLabel>
                <Select
                  onChange={(e) => {
                    setGear(e.target.value);
                  }}
                  value={gear}
                >
                  <MenuItem value="오토">오토</MenuItem>
                  <MenuItem value="스틱">스틱</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {values.map((v) => {
              return (
                <Grid item xs={6} md={3} lg={6} key={v.name}>
                  <Typography>{v.name}</Typography>
                  <TextField
                    name={v.values}
                    type={"text"}
                    margin="normal"
                    label={v.name}
                    value={v.value}
                    size="small"
                    onChange={onChangeInput}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "22px",
              marginTop: "15px",
              paddingBottom: "15px",
              fontWeight: "bold",
            }}
          >
            차 설명
          </Typography>
          <Grid container className={classes.gridContainer}>
            <FormControl fullWidth sx={{ ml: 3, mr: 3 }}>
              <TextField
                label="차량상태 및 기타등등 자세하게 적어주세요."
                required
                name="contents"
                margin="normal"
                multiline
                value={contents}
                onChange={onChangeInput}
                rows={5}
              />
            </FormControl>
          </Grid>
          {!location.state ? (
            <Grid>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "22px",
                  marginTop: "15px",
                  paddingBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                사진첨부
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"15px"}
                color="text.secondary"
              >
                * 썸네일 사진을 첫번째로 첨부 해주세요. *
              </Typography>
              <Grid container className={classes.gridContainer}>
                <FormControl
                  fullWidth
                  sx={{ ml: 3, mr: 3, mt: 2, mb: 2 }}
                  onChange={addImages}
                >
                  <TextField
                    type="file"
                    hidden
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          {!location.state ? (
            <Grid mb={3}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "22px",
                  marginTop: "15px",
                  paddingBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                성능기록부
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={"15px"}
                color="text.secondary"
              ></Typography>
              <Grid container className={classes.gridContainer}>
                <FormControl
                  fullWidth
                  sx={{ ml: 3, mr: 3, mt: 2, mb: 2 }}
                  onChange={(e) => image.push(e.target.files[0])}
                >
                  <TextField type="file" hidden />
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
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
              onClick={location.state ? retouch : onSubmit}
            >
              {location.state ? "수정하기" : "등록하기"}
            </Button>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default ProductCreate;

import React, { useState } from "react";
import {
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../utils/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function ProductListItem({ list, lists }) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const theme = useTheme();
  const slidemdMedio = useMediaQuery(theme.breakpoints.down("md"));

  const PER_PAGE = 12;
  let count = Math.ceil(list.length / PER_PAGE);
  let _DATA = usePagination(lists.length >= 1 ? lists : list, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (lists.length >= 1) {
    count = Math.ceil(lists.length / PER_PAGE);
  }

  return (
    <>
      <Grid container spacing={2} mt={2} mb={7}>
        {_DATA.currentData().map((v) => (
          <Grid item={true} xs={6} md={4} lg={3} key={v.date}>
            <Card
              onClick={() =>
                navigate(`/productlist/category=${v.km}`, { state: v })
              }
              variant="outlined"
              sx={{
                border: "2px solid #FDD431",
                height: "280px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={150}
                  image={v.thumbnail_image}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    fontWeight={"bolder"}
                    fontSize={!slidemdMedio ? "20px" : "16px"}
                  >
                    ❗️{v.produce} {v.series}❗️
                  </Typography>
                  <Typography fontSize={"10px"} color="text.secondary" mb={1}>
                    {v.year} {Number(v.km).toLocaleString()}km {v.fuel} {v.gear}
                  </Typography>
                  <Typography
                    color={"#FDD431"}
                    fontSize={!slidemdMedio ? "20px" : "17px"}
                    fontWeight="bold"
                  >
                    {v.price}만원/월{v.month}(할부)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid display={"flex"} justifyContent="center">
        <Stack spacing={1}>
          <Pagination
            count={count}
            size="large"
            page={page}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Grid>
    </>
  );
}

export default ProductListItem;

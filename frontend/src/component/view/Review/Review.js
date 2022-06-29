import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../App";
import usePagination from "../../../utils/Pagination";
import star from "../../../utils/star";

const styles = makeStyles({
  button: {
    background: "#E0E0E0",
  },
  tablecontainer: {
    borderLeft: "1px solid #C2C2C2",
    borderRight: "1px solid #C2C2C2",
    borderTop: "2px solid black",
    borderBottom: "1px solid black",
  },
});

function Review() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const { isLogin } = useContext(AppContext);

  const classes = styles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const PER_PAGE = 12;
  const count = Math.ceil(list.length / PER_PAGE);
  const _DATA = usePagination(list, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    (async function start() {
      const res = await axios.get("/review");
      if (!res.data) {
        return enqueueSnackbar("판매후기 불러오는중에 오류가 발생했습니다.", {
          variant: "info",
        });
      } else {
        return setList(res.data);
      }
    })();
  }, []);

  return (
    <>
      <Container
        component={"main"}
        maxWidth={"lg"}
        sx={{
          mt: 8,
          mb: 5,
        }}
      >
        <Grid borderBottom="1px solid #C2C2C2" mb={7} pb={5}>
          <Typography textAlign={"center"} fontSize="25px" fontWeight={"bold"}>
            판매 후기
          </Typography>
        </Grid>
        <Grid ml={3} display="flex" justifyContent={"space-between"}>
          <Typography fontWeight={"bold"} fontSize={"14px"}>
            전체 : {list.length}
          </Typography>
          {!isLogin ? (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              disabled
              sx={{ mr: 3, background: "#FDD431" }}
            >
              로그인 후 이용 가능합니다.
            </Button>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ mr: 3, background: "#FDD431" }}
              onClick={() => navigate("/reviewamend")}
            >
              글쓰기
            </Button>
          )}
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <TableContainer className={classes.tablecontainer} component={Paper}>
            <Table
              sx={{ minWidth: 550 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ background: "#F2F2F2" }}>
                <TableRow>
                  {[
                    "#",
                    "만족도",
                    "제목",
                    "상세내용",
                    "작성자",
                    "등록일",
                    "조회수",
                  ].map((v, i) => (
                    <TableCell
                      key={i}
                      align={
                        v === "#" || v === "만족도"
                          ? "left"
                          : v === "작성자"
                          ? "right"
                          : "center"
                      }
                    >
                      {v}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {_DATA.currentData().map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      backgroundColor: row.id === 1 && "#FFD491",
                    }}
                    onClick={() =>
                      navigate(`/review/category=${row.id}}`, {
                        state: row.id,
                      })
                    }
                  >
                    <TableCell align="left" component="th" scope="row">
                      {row.id === 1 ? "*" : row.id}
                    </TableCell>
                    <TableCell align="left">
                      {row.id === 1 ? "" : star(row.satisfied)}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      {row.contents.length > 30
                        ? `${row.contents.slice(0, 28)}...`
                        : row.contents}
                    </TableCell>
                    <TableCell align="right">
                      {row.writer && `${row.writer.slice(0, 1)}**`}
                    </TableCell>
                    <TableCell align="center">
                      {row.date && row.date.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">{row.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent={"center"} mt={2}>
            <Pagination
              count={count}
              size="small"
              page={page}
              shape="rounded"
              onChange={handleChange}
            />
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Review;

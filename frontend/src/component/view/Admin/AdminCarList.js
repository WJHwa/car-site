import React, { useContext, useEffect, useState } from "react";
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
  IconButton,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { AppContext } from "../../../App";
import axios from "axios";
import MenuOnClick from "../../../utils/MenuOnClick";
import { Delete, Create } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../utils/Pagination";

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
  categoryBox: {
    display: "flex",
    alignItems: "center",
  },
});

function AdminCarList() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [lists, setLists] = useState([]);
  const [text, setText] = useState("");
  const [deleteNum, setDeleteNum] = useState("");
  const [page, setPage] = useState(1);
  const { SmMedio, MdMedio } = useContext(AppContext);

  const classes = styles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const PER_PAGE = 14;
  let count = Math.ceil(list.length / PER_PAGE);
  let _DATA = usePagination(lists.length >= 1 ? lists : list, PER_PAGE);

  if (lists.length >= 1) {
    count = Math.ceil(lists.length / PER_PAGE);
  }

  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }

  function searchOnClick() {
    let data = [...list];
    let blank = /[\s]/g;
    if (text === "") {
      return Alerts("차량번호를 입력해주세요.", "info");
    }
    if (blank.test(text) === true) {
      return Alerts("공백이 있습니다. 공백없이 입력해주세요.", "info");
    }
    data = data.filter((v) => v.car_num === text);
    if (data.length === 0) {
      return Alerts("찾으시는 차량이 없습니다.다시 확인해주세요.", "info");
    }
    return setLists([...data]);
  }

  async function deleteClick(e) {
    const res = await axios.delete(`/admin/carlist/${deleteNum}`);
    if (res.data) {
      Alerts("삭제를 완료하였습니다.", "success");
      setOpen(false);
    } else {
      return Alerts("삭제중 오류가 있습니다.", "info");
    }
  }

  async function lastlist(v, list) {
    let result = await MenuOnClick(v, [...list]);
    return setLists(result);
  }

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    (async function get() {
      const res = await axios.get("/admin/carlist");
      if (!res.data) {
        return Alerts(
          "차량 리스트 조회중 오류가 발생했습니다.다시 시도해주세요.",
          "info"
        );
      }
      setList(res.data);
    })();
  }, [open]);

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
        <Grid borderBottom="1px solid #C2C2C2" mb={4} pb={5}>
          <Typography textAlign={"center"} fontSize="25px" fontWeight={"bold"}>
            차량 리스트
          </Typography>
        </Grid>
        <Grid ml={3} display="flex" justifyContent={"space-between"} mb={3}>
          <Box className={classes.categoryBox}>
            <Typography fontWeight={"bold"}>전체 : {list.length} </Typography>
          </Box>
          <Box className={classes.categoryBox}>
            <Typography fontWeight={"bold"} mr={1}>
              {MdMedio ? "" : "차량번호 검색"}
            </Typography>
            <TextField
              size="small"
              value={text}
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={searchOnClick}
              sx={{ pt: 1, pb: 1 }}
            >
              검색하기
            </Button>
            {SmMedio ? (
              <></>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ ml: 2 }}
                onClick={() => setLists(list)}
              >
                전체보기
              </Button>
            )}
            {SmMedio ? (
              <></>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ ml: 2 }}
                onClick={() => lastlist("최근등록순", [...list])}
              >
                최근등록순
              </Button>
            )}
          </Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ mr: 3 }}
            onClick={() => navigate("/productCreate")}
          >
            차량 등록
          </Button>
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
                    "차량번호",
                    "국산수입",
                    "제조사",
                    "시리즈",
                    "모델",
                    "가격",
                    "연식",
                    "키로수",
                    "등록일",
                    "수정/삭제",
                  ].map((v) => (
                    <TableCell key={v} align="center">
                      {v}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {_DATA.currentData().map((row) => (
                  <TableRow
                    key={row.km}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.car_num}</TableCell>
                    <TableCell align="center">{row.origin}</TableCell>
                    <TableCell align="center">{row.produce}</TableCell>
                    <TableCell align="center">{row.series}</TableCell>
                    <TableCell align="center">{row.model}</TableCell>
                    <TableCell align="center">{row.price}만원</TableCell>
                    <TableCell align="center">{row.year}년식</TableCell>
                    <TableCell align="center">
                      {Number(row.km).toLocaleString()} km
                    </TableCell>
                    <TableCell align="center">
                      {row.date && row.date.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="retouch"
                        size="small"
                        onClick={() =>
                          navigate("/productcreate", { state: row })
                        }
                      >
                        <Create fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setDeleteNum(row.car_num);
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          backgroundColor: "rgba(76, 76, 76, 0.7)",
        }}
      >
        <Box className={classes.modal}>
          <Typography variant="h6" component="h2" mb={6}>
            차량번호 {deleteNum} 삭제 하시겠습니까?
          </Typography>
          <Box display="flex" justifyContent={"space-evenly"}>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={() => deleteClick()}
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

export default AdminCarList;

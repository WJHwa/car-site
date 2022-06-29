import React, { useEffect, useState } from "react";
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
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import usePagination from "../../../utils/Pagination";
import axios from "axios";

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
  tablecell: {
    fontSize: "12.5px",
  },
});

function AdminConsultList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const classes = styles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }

  const PER_PAGE = 14;
  const count = Math.ceil(list.length / PER_PAGE);
  const _DATA = usePagination(list, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    (async function get() {
      let res = await axios.get("/admin/consultlist");
      if (!res.data) {
        return Alerts(
          "상담 리스트 조회중 오류가 발생했습니다.다시 시도해주세요.",
          "info"
        );
      } else {
        return setList(res.data);
      }
    })();
  }, []);

  return (
    <>
      <Container
        component={"main"}
        maxWidth={"xl"}
        sx={{
          mt: 8,
          mb: 5,
        }}
      >
        <Grid borderBottom="1px solid #C2C2C2" mb={4} pb={5}>
          <Typography textAlign={"center"} fontSize="25px" fontWeight={"bold"}>
            상담 요청 리스트
          </Typography>
        </Grid>
        <Grid ml={3} display="flex" justifyContent={"space-between"}>
          <Typography>전체 : {list.length}</Typography>
        </Grid>
        <Container maxWidth="xl" sx={{ mt: 1 }}>
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
                    "성함",
                    "전화번호",
                    "시간대",
                    "목적",
                    "제목/내용",
                    "등록일",
                  ].map((v, i) => (
                    <TableCell key={i} align="center">
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
                    }}
                    onClick={() =>
                      navigate(`/admin/consultlist/${row.id}`, {
                        state: { row },
                      })
                    }
                  >
                    <TableCell align="center" className={classes.tablecell}>
                      {row.id}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.user_name}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.user_phone}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.user_time}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.user_consult}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.consult_title} /// {row.consult_contents}
                    </TableCell>
                    <TableCell align="center" className={classes.tablecell}>
                      {row.consult_date.slice(0, 10)}
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
    </>
  );
}

export default AdminConsultList;

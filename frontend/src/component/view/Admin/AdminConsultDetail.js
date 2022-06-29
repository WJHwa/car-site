import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button, Box, Modal } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  box: {
    marginTop: "10%",
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: "10%",
    alignItems: "center",
    border: "0 solid #DFDCDC",
    borderTopWidth: "0.1px",
    borderLeftWidth: "0.1px",
    borderRadius: "10px 10px 10px 10px",
    paddingBottom: "40px",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "40px",
    WebkitBoxShadow: "27px 43px 43px -20px rgba(89,89,89,0.39)",
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
});

function AdminConsultDetail() {
  const [list, setList] = useState([]);
  const [on, setOn] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const classes = styles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  function Alerts(contents, color) {
    return enqueueSnackbar(contents, {
      variant: color,
    });
  }

  async function deleteClick(e) {
    const res = await axios.delete(`/admin/consultlist/${id}`);
    if (!res.data) {
      return Alerts(
        "삭제하는중 오류가 발생했습니다.다시 시도해주세요.",
        "info"
      );
    } else {
      Alerts("삭제되었습니다.", "success");
      return navigate("/admin/consultlist");
    }
  }

  useEffect(() => {
    setList(location.state.row);
  }, []);

  return (
    <>
      <Container
        component={"main"}
        maxWidth={"md"}
        sx={{
          mb: 8,
          mt: 8,
        }}
      >
        <Box className={classes.box}>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            이름 : {list.user_name}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            전화번호 : {list.user_phone}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            목적 : {list.user_consult}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            제목 : {list.consult_title}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            내용 : {list.consult_contents}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2} mt={2}>
            시간대 : {list.user_time}
          </Typography>
          <Typography fontSize={"17px"} ml={3} mb={2}>
            작성시간 : {list.consult_date && list.consult_date.slice(0, 10)}
          </Typography>
        </Box>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
        >
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={() => {
                setOn(true);
                setId(list.id);
              }}
            >
              삭제
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={on}
        onClose={() => setOn(false)}
        sx={{
          backgroundColor: "rgba(76, 76, 76, 0.7)",
        }}
      >
        <Box className={classes.modal}>
          <Typography variant="h6" component="h2" mb={6}>
            정말 삭제 하시겠습니까?
          </Typography>
          <Box display="flex" justifyContent={"space-evenly"}>
            <Button
              size="large"
              variant="contained"
              onClick={() => deleteClick()}
            >
              삭제
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => setOn(false)}
            >
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AdminConsultDetail;

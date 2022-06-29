const express = require("express");
const app = express();
const index = require("./route/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { authenticateAccessToken } = require("./middleware/middlewares");

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// fs.readdir("uploads", (error) => {
//   if (error) {
//     console.error("uploads폴더가 없어 uploads폴더를 생성합니다.");
//     fs.mkdirSync("uploads");
//   }
// });

require("dotenv").config();

//라우팅
app.use(index);

app.listen(process.env.POST, () => {
  console.log("server Port 8080");
});

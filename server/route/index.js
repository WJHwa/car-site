const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middlewares");
const db = require("../db");
const crypto = require("crypto");
const salt = crypto.randomBytes(32).toString();
const ctrl = require("./ctrl");
const fs = require("fs");

router.get("/islogin", async (req, res) => {
  let authHeader = req.headers.authorization;
  let token = authHeader.split(".")[1];
  var payload = Buffer.from(token, "base64");
  var result = JSON.parse(payload.toString());
  if (result.id.split(",")[0] === "on") {
    return res.send({ admin: "on" });
  } else {
    return res.send({
      ids: result.id.split(",")[1],
      phone: result.id.split(",")[2],
      name: result.id.split(",")[3],
    });
  }
});

router.get("/carlist", async (req, res) => {
  try {
    const result_foreign = await db.query(
      "SELECT * FROM Car_store.product_list WHERE origin = '수입'"
    );
    const result_korea = await db.query(
      "SELECT * FROM Car_store.product_list WHERE origin = '국산'"
    );
    const review = await db.query("SELECT * FROM Car_store.review");

    res.send({
      foreign: result_foreign[0],
      korea: result_korea,
      review: review,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/productcreate/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "SELECT * FROM Car_store.product_list WHERE car_num=?",
      id
    );
    return res.send(result[0]);
  } catch (err) {
    res.send(false);
  }
});

router.get("/productlist", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Car_store.product_list");
    res.send(result[0]);
  } catch (err) {
    res.send(false);
  }
});
router.get("/productlist/:id", async (req, res) => {
  const data = JSON.parse(req.params.id).filter((v) => v !== "");
  try {
    let result;
    switch (data.length) {
      case 4:
        result = await db.query(
          "SELECT * FROM Car_store.product_list WHERE origin=? AND produce =? AND series =? AND model=?",
          data
        );
        return res.send(result[0]);

      case 3:
        result = await db.query(
          "SELECT * FROM Car_store.product_list WHERE origin=? AND produce =? AND series =?;",
          data
        );
        return res.send(result[0]);

      case 2:
        result = await db.query(
          "SELECT * FROM Car_store.product_list WHERE origin=? AND produce =?",
          data
        );
        return res.send(result[0]);

      case 1:
        result = await db.query(
          "SELECT * FROM Car_store.product_list WHERE origin=?",
          data
        );
        return res.send(result[0]);
    }
  } catch (err) {
    res.send(false);
  }
});

router.get("/review", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id,password,writer,title,satisfied,date,contents,views FROM Car_store.review"
    );
    res.send(result[0]);
  } catch (err) {
    res.send(false);
  }
});

router.get("/review/category/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      "SELECT * FROM Car_store.review WHERE id=?",
      id
    );
    const comment = await db.query(
      "SELECT * FROM Car_store.comment WHERE idx =? ",
      id
    );

    await db.query("UPDATE Car_store.review SET views=? WHERE id=?", [
      result[0][0].views + 1,
      id,
    ]);

    return res.send([{ list: result[0][0] }, { comment: comment[0] }]);
  } catch (err) {
    res.send(false);
  }
});

router.get("/admin/carlist", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT car_num,origin,produce,series,model,price,year,km,date FROM Car_store.product_list"
    );
    return res.send(result[0]);
  } catch (err) {
    res.send(false);
  }
});

router.get("/admin/consultlist", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Car_store.consult_list");
    return res.send(result[0]);
  } catch (err) {
    res.send(false);
  }
});
router.post("/productdetail", async (req, res) => {
  const { car_num } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM Car_store.image WHERE image_num=?",
      car_num
    );
    res.send(result[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const { id, name, password, phone, checked2 } = req.body;
  const hashedPw = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha256")
    .toString("hex");
  try {
    const result = await db.query(
      "SELECT user_id FROM Car_store.user WHERE user_id=?",
      id
    );
    if (result[0].length === 0) {
      await db.query(
        "INSERT INTO Car_store.user(user_password,user_id,user_salt,user_name,user_phone) VALUES(?,?,?,?,?);",
        [hashedPw, id, salt, name, phone]
      );
      return res.send(true);
    } else {
      res.send("ID");
    }
  } catch (err) {
    res.send(false);
  }
});

router.post("/productCreate", ctrl.upload, async (req, res) => {
  const {
    origin,
    produce,
    series,
    model,
    price,
    year,
    color,
    fuel,
    km,
    month,
    car_num,
    accident,
    contents,
    size,
    gear,
  } = JSON.parse(req.body.data);

  const image = [];
  const perfomance = [];
  let imagenum = "";

  for (let i = 0; i < req.files.length - 1; i++) {
    image.push(req.files[i].path);
    imagenum += `,image${i}`;
  }
  perfomance.push(req.files[req.files.length - 1].path);

  try {
    await db.query(
      `INSERT INTO Car_store.image(image_num,performance_image${imagenum}) VALUES(?,?,?)`,
      [car_num, perfomance, image]
    );
    await db.query(
      `INSERT INTO Car_store.product_list (origin, produce,series,model,price,year,color,fuel,km,month,car_num,accident,contents,size,gear,thumbnail_image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        origin,
        produce,
        series,
        model,
        price,
        year,
        color,
        fuel,
        km,
        month,
        car_num,
        accident,
        contents,
        size,
        gear,
        image[0],
      ]
    );
    res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.post("/review/category/comment/:id", async (req, res) => {
  const { text, name, idx } = req.body;
  try {
    await db.query(
      "INSERT INTO Car_store.comment(idx,writer,title) VALUES(?,?,?)",
      [idx, name, text]
    );
    res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.post("/consult", async (req, res) => {
  const { name, phone, time, title, contents } = req.body.Inputs;
  const category = req.body.category;
  try {
    await db.query(
      `INSERT INTO Car_store.consult_list(user_name,user_phone,user_time,user_consult,consult_title,consult_contents) VALUES(?,?,?,?,?,?)`,
      [name, phone, time, category, title, contents]
    );
    res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM Car_store.user WHERE user_id = ?",
      id
    );
    if (result[0].length === 1) {
      const { user_salt, user_password } = result[0][0];
      const hashedPw = crypto
        .pbkdf2Sync(password, user_salt, 10000, 64, "sha256")
        .toString("hex");

      if (user_password === hashedPw) {
        let accessToken = middleware.generateAccessToken(
          result[0][0].admin +
            `,${result[0][0].user_id}` +
            `,${result[0][0].user_phone}` +
            `,${result[0][0].user_name}`
        );
        let user = {
          ids: result[0][0].user_id,
          name: result[0][0].user_name,
          phone: result[0][0].user_phone,
          admin: result[0][0].admin,
          Token: accessToken,
        };
        res.send(user);
      } else {
        res.send("비밀번호를 잘못 입력했습니다.");
      }
    } else {
      res.send("아이디를 잘못 입력했습니다.");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/reviewamend", ctrl.upload, async (req, res) => {
  const { title, contents, clicked, password, name, ids } = JSON.parse(
    req.body.data
  );
  const image = [];
  let imagenum = "";
  for (let i = 0; i < req.files.length; i++) {
    image.push(req.files[i].path);
    imagenum += `,image${i}`;
  }
  try {
    const result = await db.query(
      "SELECT user_salt FROM Car_store.user WHERE user_id=?",
      ids
    );
    const hashedPw = crypto
      .pbkdf2Sync(password, result[0][0].user_salt, 10000, 64, "sha256")
      .toString("hex");
    await db.query(
      `INSERT INTO Car_store.review(password,writer,title,satisfied,contents${imagenum}) VALUES(?,?,?,?,?,?)`,
      [hashedPw, name, title, clicked, contents, image]
    );
    return res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.post("/review/category/delete", async (req, res) => {
  const { id, pwd, password, ids, image } = req.body;

  try {
    const salt = await db.query(
      "SELECT user_salt FROM Car_store.user WHERE user_id=?",
      ids
    );
    const hashedPw = crypto
      .pbkdf2Sync(pwd, salt[0][0].user_salt, 10000, 64, "sha256")
      .toString("hex");

    if (password !== hashedPw) {
      return res.send("password");
    }

    for (let i = 0; i < image.length; i++) {
      fs.unlinkSync(image[i]);
    }

    await db.query("DELETE FROM Car_store.review WHERE id =?", id);
    return res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.put("/reviewamend", async (req, res) => {
  const { title, contents, clicked, id } = req.body;

  try {
    await db.query(
      "UPDATE Car_store.review SET contents=?,title=?,satisfied=? WHERE id =?",
      [contents, title, clicked, id]
    );
    return res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.put("/productCreate", async (req, res) => {
  let {
    origin,
    produce,
    series,
    model,
    price,
    year,
    color,
    fuel,
    km,
    month,
    car_num,
    accident,
    contents,
    size,
    gear,
  } = req.body;

  try {
    await db.query(
      "UPDATE Car_store.product_list SET origin=?,produce=?,series=?,model=?,price=?,year=?,color=?,fuel=?,km=?,month=?,car_num=?,accident=?,contents=?,size=?,gear=? WHERE car_num=?",
      [
        origin,
        produce,
        series,
        model,
        price,
        year,
        color,
        fuel,
        km,
        month,
        car_num,
        accident,
        contents,
        size,
        gear,
        car_num,
      ]
    );
    res.send(true);
  } catch (err) {
    res.send(false);
  }
});

router.delete("/admin/carlist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM Car_store.product_list WHERE car_num=?", id);
    let image = [];
    let result = await db.query(
      "SELECT * FROM Car_store.image WHERE image_num=?",
      id
    );

    image.push(result[0][0].image0);
    image.push(result[0][0].image1);
    image.push(result[0][0].image2);
    image.push(result[0][0].image3);
    image.push(result[0][0].image4);
    image.push(result[0][0].image5);
    image.push(result[0][0].image6);
    image.push(result[0][0].image7);
    image.push(result[0][0].image8);
    image.push(result[0][0].image9);
    image.push(result[0][0].image10);
    image.push(result[0][0].performance_image);

    image = image.filter((e) => e !== null);
    for (let i = 0; i < image.length; i++) {
      fs.unlinkSync(image[i]);
    }
    await db.query("DELETE FROM Car_store.image WHERE image_num=?", id);

    res.send(true);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/admin/consultlist/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM Car_store.consult_list WHERE id = ?", id);
    return res.send(true);
  } catch (err) {
    res.send(false);
  }
});

router.delete("/review/category/comment/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM Car_store.comment WHERE id =?", id);
    return res.send(true);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

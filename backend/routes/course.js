const express = require("express");
const router = express.Router();
const db = require("../startup/db");
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");

router.get("/", auth, function (req, res) {
  const sql = `SELECT * FROM COURSE WHERE ?=d_id`;
  db.query(sql, [req.user.d_id], function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results);
  });
});

router.post("/add", auth, college_admin, function (req, res) {
  const sql = "INSERT INTO COURSE(name,c_code,d_id) VALUES (?,?,?)";
  db.query(
    sql,
    [req.body.name, req.body.c_code, req.body.d_id],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err.sqlMessage);
        return console.log(err);
      }
      res.send(results);
    }
  );
});

router.get("/all", auth, college_admin, function (req, res) {
  const sql = "SELECT * FROM COURSE";
  db.query(sql, function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results);
  });
});

router.get("/post", auth, function (req, res) {
  const sql = `SELECT * FROM CLASS_POST NATURAL JOIN COURSE WHERE c_id IN (SELECT c_id FROM COURSE_STUDENTS WHERE ?=s_id) ORDER BY DATE DESC`;
  db.query(sql, [req.user.s_id], function (err, results, fields) {
    if (err) {
      res.status(502).send("SERVER ERROR!");
      return console.log(err);
    }
    res.send(results);
  });
});

router.post("/post", auth, function (req, res) {
  const sql = `INSERT INTO CLASS_POST(author,c_id,message,title) VALUES (?,?,?,?)`;
  db.query(
    sql,
    [req.user.name, req.body.c_id, req.body.message, req.body.title],
    function (err, results, fields) {
      if (err) return console.log(err);
      res.send(results);
    }
  );
});

router.post("/register", function (req, res) {
  const sql = "INSERT INTO COURSE_STUDENTS(s_id,c_id) VALUES(?,?)";
  db.query(
    sql,
    [req.body.s_id, req.body.c_id],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err.sqlMessage);
        return console.log(err);
      }
      res.send(results);
    }
  );
});

module.exports = router;

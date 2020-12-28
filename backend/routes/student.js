const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");
const db = require("../startup/db");

router.post("/", auth, college_admin, function (req, res) {
  const sql =
    "INSERT INTO STUDENT(name,email,year,d_id,counsellor_id,cgpa,usn,current_backlogs,password,is_spc) VALUES(?,?,?,?,?,?,?,?,?,?)";
  const {
    name,
    email,
    year,
    d_id,
    counsellor_id,
    cgpa,
    usn,
    current_backlogs,
    password,
    is_spc,
  } = req.body;
  db.query(
    sql,
    [
      name,
      email,
      year,
      d_id,
      counsellor_id,
      cgpa,
      usn,
      current_backlogs,
      password,
      is_spc,
    ],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err.sqlMessage);
        return console.log(err);
      }
      res.send(results);
    }
  );
});

router.put("/", auth, college_admin, function (req, res) {
  const sql =
    "UPDATE STUDENT SET name=?,email=?,year=?,d_id=?,counsellor_id=?,cgpa=?,usn=?,current_backlogs=?,is_spc=? WHERE s_id=?";
  const {
    name,
    email,
    year,
    d_id,
    counsellor_id,
    cgpa,
    usn,
    current_backlogs,
    is_spc,
    s_id,
  } = req.body;
  db.query(
    sql,
    [
      name,
      email,
      year,
      d_id,
      counsellor_id,
      cgpa,
      usn,
      current_backlogs,
      is_spc,
      s_id,
    ],
    function (err, results, fields) {
      console.log(results);
      if (err) {
        res.status(400).send(err.sqlMessage);
        return console.log(err);
      }
      res.send(results);
    }
  );
});

router.get("/", auth, college_admin, function (req, res) {
  const sql =
    "SELECT name, email, year, d_id, counsellor_id, cgpa, usn, s_id, current_backlogs, is_spc,d_name FROM STUDENT NATURAL JOIN DEPARTMENT";
  db.query(sql, function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results);
  });
});

router.delete("/", auth, college_admin, function (req, res) {
  const sql = `DELETE FROM STUDENT WHERE s_id=?`;
  db.query(sql, [req.body.s_id], function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results);
  });
});

module.exports = router;

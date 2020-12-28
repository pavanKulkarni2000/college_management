const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const college_admin = require("../middleware/college_admin");
const db = require("../startup/db");

router.post("/", auth, college_admin, function (req, res) {
  const sql =
    "INSERT INTO INSTRUCTOR(name,email,d_id,password,is_hod) VALUES(?,?,?,?,?)";
  const { name, email, d_id, password, is_hod } = req.body;
  db.query(
    sql,
    [name, email, d_id, password, is_hod],
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
    "UPDATE INSTRUCTOR SET name=?,email=?,d_id=?,is_hod=? WHERE i_id=?";
  const { name, email, d_id, is_hod, i_id } = req.body;
  db.query(
    sql,
    [name, email, d_id, is_hod, i_id],
    function (err, results, fields) {
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
    "SELECT i_id,name, email,d_id,is_hod,d_name FROM INSTRUCTOR NATURAL JOIN DEPARTMENT";
  db.query(sql, function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    delete results.password;
    res.send(results);
  });
});

router.delete("/", auth, college_admin, function (req, res) {
  const sql = "DELETE FROM INSTRUCTOR WHERE i_id=?";
  db.query(sql, [req.body.i_id], function (err, results, fields) {
    if (err) {
      res.status(400).send(err.sqlMessage);
      return console.log(err);
    }
    res.send(results);
  });
});

module.exports = router;

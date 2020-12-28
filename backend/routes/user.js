const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const db = require("../startup/db");

router.get("/", auth, function (req, res) {
  db.query(
    "SELECT * FROM STUDENT NATURAL JOIN DEPARTMENT WHERE email=?",
    [req.user.email],
    function (err, results, fields) {
      if (err) {
        console.log(err.sqlMessage);
        return res.status(400).send(err.sqlMessage);
      }
      if (results.length != 1)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      res.send(results[0]);
    }
  );
});

router.get("/teacher/", auth, function (req, res) {
  db.query(
    "SELECT * FROM INSTRUCTOR NATURAL JOIN DEPARTMENT WHERE email =?",
    [req.user.email],
    function (err, results, fields) {
      if (err) {
        console.log(err.sqlMessage);
        return res.status(400).send(err.sqlMessage);
      }
      if (results.length != 1)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      res.send(results[0]);
    }
  );
});

router.get("/admin/", auth, function (req, res) {
  db.query("SELECT * FROM ADMIN", function (err, results, fields) {
    if (err) {
      console.log(err.sqlMessage);
      return res.status(400).send(err.sqlMessage);
    }
    if (results.length != 1)
      return res.status(400).send("Invalid Email or Password!");
    delete results[0].password;
    res.send(results[0]);
  });
});

module.exports = router;

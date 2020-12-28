// const bcrypt = require('bcrypt')
const express = require("express");
const router = express.Router();
const db = require("../startup/db");
const jwt = require("jsonwebtoken");

function generateAuthToken(object) {
  const token = jwt.sign(JSON.stringify(object), "jwtPrivateKey");
  return token;
}

router.post("/instructor", (req, res) => {
  db.query(
    "SELECT * FROM INSTRUCTOR WHERE ?=email",
    [req.body.email],
    function (err, results, fields) {
      if (err) return console.log(err);
      if (results.length != 1)
        return res.status(400).send("Invalid Email or Password!");
      if (results[0].password != req.body.password)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      const token = generateAuthToken(results[0]);
      res.send({ token });
    }
  );
});

router.post("/student", (req, res) => {
  db.query(
    "SELECT * FROM STUDENT WHERE email=?",
    [req.body.email],
    function (err, results, fields) {
      if (err) return console.log(err);
      if (results.length != 1)
        return res.status(400).send("Invalid Email or Password!");
      if (results[0].password != req.body.password)
        return res.status(400).send("Invalid Email or Password!");
      // const salt = await bcrypt.genSalt(10);
      // const password = await bcrypt.hash(results[0].password, salt);
      // const validPassword = await bcrypt.compare(req.body.password,password);
      // if(!validPassword) return res.status(400).send('Invalid Email or Password!')
      delete results[0].password;
      const token = generateAuthToken(results[0]);
      res.send({ token });
    }
  );
});

router.post("/admin", (req, res) => {
  db.query(
    "SELECT * FROM ADMIN WHERE ?=email",
    [req.body.email],
    function (err, results, fields) {
      if (err) return console.log(err);
      if (results.length != 1)
        return res.status(400).send("Invalid Email or Password!");
      if (results[0].password != req.body.password)
        return res.status(400).send("Invalid Email or Password!");
      delete results[0].password;
      const token = generateAuthToken(results[0]);
      res.send({ token });
    }
  );
});

module.exports = router;

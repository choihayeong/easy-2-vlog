const express = require("express");
const router = express.Router();
const maria = require("../database/connect/maria");

/**
 * List (READ)
 */
router.get("/department", (req, res) => {
  maria.query("SELECT * FROM DEPARTMENT", (err, rows, fields) => {
    if (!err) {
      res.send(rows); // responses send rows
    } else {
      console.log("err: " + err);
      res.send(err); // responses send err
    }
  });
});

/**
 * INSERT (CREATE)
 */
router.get("/insert", (req, res) => {
  maria.query(
    "INSERT INTO DEPARTMENT(DEPT_CODE, NAME) VALUES(0000, 'FRONTEND')",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows); // responses send rows
      } else {
        console.log("err: " + err);
        res.send(err); // responses send err
      }
    },
  );
});

/**
 * ❗ danger
 */
router.get("/create", function (req, res) {
  maria.query(
    "CREATE TABLE DEPARTMENT (" +
      "DEPT_CODE INT(11) NOT NULL," +
      "NAME VARCHAR(200) NULL DEFAULT NULL COLLATE utf8mb3_general_ci," +
      "PRIMARY KEY (DEPT_CODE) USING BTREE)",
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // responses send rows
      } else {
        console.log("err: " + err);
        res.send(err); // responses send err
      }
    },
  );
});

router.get("/drop", (req, res) => {
  maria.query("DROP TABLE DEPARTMENT", (err, rows, fields) => {
    if (!err) {
      res.send(rows); // responses send rows
    } else {
      console.log("err : " + err);
      res.send(err); // responses send err
    }
  });
});

/**
 * demo
 */
router.get("/get/demo", function (req, res) {
  res.status(200).json({
    message: "call get api demo",
  });
});

router.get("/post/demo", function (req, res) {
  res.status(200).json({
    message: "call post api demo",
  });
});

module.exports = router;

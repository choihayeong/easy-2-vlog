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

router.get("/videos", (req, res) => {
  maria.query("SELECT * FROM VIDEOS", (err, rows, fields) => {
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
router.post('/videos',(req, res) => {
	const video = [
		req.body.vlog_title,
		req.body.vlog_desc,
		new Date(Date.now()).toDateString(),
		req.body.hashtags,
	];

  maria.query(
    `INSERT INTO videos (vlog_title, vlog_desc, published_date, hashtags) VALUES (?)`, [video] , (err, result) => {
      if (err) res.status(500);
      console.log("result", result);
      console.log("err", err);
      res.send(result);
    }
  );
});


/**
 * VIEW (READ)
 */
router.get("/videos/:idx", (req,res) => {
  const idx = req.params.idx;
  maria.query("SELECT * FROM videos WHERE idx=?", idx, (err, result) => {
    if (err) res.status(500);
    // console.log(`video number ${idx}`);
    res.send(result[0]);
  });
});

/**
 * UPDATE
 */
router.put("/videos", (req,res)=> {
  const idx = req.body.idx;
  const video = [
		req.body.vlog_title,
		req.body.vlog_desc,
		req.body.published_date,
		req.body.hashtags,
	];

  console.log(req.body.idx, typeof idx);

  maria.query(
    `UPDATE videos SET vlog_title=?, vlog_desc=?, published_date=?, hashtags=? WHERE idx='${idx}'` , video, (err, result) => {
      if (err) res.status(500);
      console.log("result", result);
      console.log("err", err);
      res.send(result);
    }
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

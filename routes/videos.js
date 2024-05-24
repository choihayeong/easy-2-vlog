const express = require("express");
const router = express.Router();

/* GET videos listing. */
router.get("/", function (req, res, next) {
  res.send("Videos Page");
});

router.get("/list", function (req, res, next) {
  res.send("Videos list Page");
});

module.exports = router;

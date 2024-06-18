const axios = require("axios");
const express = require("express");
const router = express.Router();

const setHome = async(req, res, next) => {
  const videos = await axios
    .get(`${process.env.BASE_URL}/api/videos`)
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((error) => console.log(error));

  res.render("index.html", { title: "Home", videos });
}

/* GET home page. */
router.get("/", setHome);

module.exports = router;

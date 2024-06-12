const axios = require("axios");
const express = require("express");
const router = express.Router();

/**
 * Dummy video data
 */
const videos = [
  {
    idx: 0,
    title: "First v-log",
    description: "It's the first vlog",
    published_date: new Date(),
    views: 999,
  },
  {
    idx: 1, 
    title: "Second video",
    description: "It's the second video",
    published_date: new Date(),
    views: 9,
  },
  {
    idx: 3, 
    title: "That's just a video :P",
    description: "It's just a video :P",
    published_date: new Date(),
    views: 1,
  },
];


const FETCH_DEPARTMENT = async () => {
  await axios
    .get(`${process.env.BASE_URL}/api/department`)
    .then((response) => {
      // console.log(response);
      const { data } = response;
      // console.log(data);

      return data;
    })
    .catch((error) => console.log(error));
}

const setHome = async(req, res, next) => {
  FETCH_DEPARTMENT();
  res.render("index.html", { title: "Home", videos });
}

/* GET home page. */
router.get("/", setHome);

module.exports = router;

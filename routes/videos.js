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
    idx: 2, 
    title: "That's just a video :P",
    description: "It's just a video :P",
    published_date: new Date(),
    views: 1,
  },
];

/**
 * Controllers
 */
const getVideo = (req, res, next) => {
  const {id} = req.params;
  const video = videos[id];

  return res.render("videos_view.html", {
    title: `${video.title}`,
    id,
    video
  });
};

const getEditVideo = (req, res, next) => {
  const {id} = req.params;
  const video = videos[id];

  return res.render("videos_edit.html", {
    title: `${video.title}`,
    id,
    video
  });
};

const postEditVideo = (req, res, next) => {
  const {id} = req.params;
  const {vlog_title} = req.body;

  videos[id].vlog_title = vlog_title;

  return res.redirect(`/videos/${id}`);
}

/* GET videos listing. */
router.get("/list", function (req, res, next) {
  res.send("Videos list Page");
});

/* GET a video details */
router.get("/:id(\\d+)", getVideo);

/* GET a video edit page */
router.route("/edit/:id(\\d+)").get(getEditVideo).post(postEditVideo);

module.exports = router;

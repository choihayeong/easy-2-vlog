const axios = require("axios");
const express = require("express");
const { response } = require("../app");
const router = express.Router();

/**
 * Controllers
 */
const getVideo = async (req, res, next) => {
  const { id } = req.params;

  const video = await axios
    .get(`${process.env.BASE_URL}/api/videos/${id}`)
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((error) => console.log(error));


  return res.render("videos_view.html", {
    video
  });
};

const getUploadVideo = (req, res, next) => {
  return res.render("videos_upload.html", {});
};

const postUploadVideo = async (req, res, next) => {
  try {
    await axios.post(`${process.env.BASE_URL}/api/videos`, req.body).then((response) => {
      return res.redirect("/");
    })
  } catch (err) {
    return res.status(400).render("videos_upload.html", {
      errMessage: err._message,
    });
  }
};

const getEditVideo = async (req, res, next) => {
  const {id} = req.params;
  const video = await axios
    .get(`${process.env.BASE_URL}/api/videos/${id}`)
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((error) => console.log(error));

  return res.render("videos_edit.html", {
    video
  });
};

const postEditVideo = async(req, res, next) => {
  const {id} = req.params;

  const video = await axios
    .get(`${process.env.BASE_URL}/api/videos/${id}`)
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((error) => console.log(error));

  try {
    await axios.put(`${process.env.BASE_URL}/api/videos`, req.body).then((response) => {
      return res.redirect(`/videos/${id}`);
    })
  } catch (err) {
    return res.status(400).render("videos_edit.html", {
      video,
      errMessage: err._message,
    });
  }
};

const deleteVideo = async(req, res, next) => {
  const {id} = req.params;

  await axios.delete(`${process.env.BASE_URL}/api/videos/${id}`).then(response => {
    if (response.data.affectedRows == 1) {
      // alert("삭제 완료");
      return res.redirect("/");
    } else {
      // alert("오류가 발생했습니다.");
    }
  });

  // if (confirm("삭제하시겠습니까?")) {
  //   // 
  // }
};

/**
 * GET videos listing.
 */
router.get("/list", function (req, res, next) {
  res.send("Videos list Page");
});

/**
 * GET a video upload page.
 */
router.route("/upload").get(getUploadVideo).post(postUploadVideo);

/**
 * GET a video details
 */
router.get("/:id(\\d+)", getVideo);

/**
 * GET a video edit page
 */
router.route("/edit/:id(\\d+)").get(getEditVideo).post(postEditVideo);

/**
 * DELETE a video 
 */
router.get("/delete/:id(\\d+)", deleteVideo);

module.exports = router;

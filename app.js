const express = require("express");
const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const usersRouter = require("./routes/users");
const videosRouter = require("./routes/videos");

const app = express();

// mariaDB connect
const maria = require("./database/connect/maria");
maria.connect();

// view engine setup
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);

module.exports = app;

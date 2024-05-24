# easy_2_vlog

> easy to watch and edit vlog app by using node.js, express, mariaDB, ejs(template)

### package.json
```json
{
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "morgan": "~1.9.1",
    "mysql": "^2.18.1",
    "nodemon": "^3.1.0"
  },
  "devDependencies": {
    "husky": "^9.0.11",
    "lint-staged": "^15.2.4",
    "prettier": "3.2.5"
  },
}
```

### express

```bash
npm install -g express-generator
```

```bash
express your-app(앱 이름)
cd your-app
npm install
npm start
```

### MariaDB Installation

- [MariaDB 설치](https://mariadb.org/download)

- [Heidi SQL 설치](https://www.heidisql.com/download.php)

- `database/connect/maria.js`

```javascript
const maria = require("mysql");

const conn = maria.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "${PASSWORD}",
  database: "${DB_NAME}",
});

module.exports = conn;
```

- `app.js` 및 ` routes` 파일 내 api 생성 하는 곳에 위 파일을 임포트 함

```javascript
// mariaDB connect
const maria = require("./database/connect/maria");
maria.connect();
```

### Template (Ejs)

- Using static html with ejs [Ejs](https://ejs.co/)

- [rendering static html instead of dynamic template](https://stackoverflow.com/questions/4529586/render-basic-html-view)

- `app.js`에 다음과 같이 입력 (jade 렌더링 한 곳 삭제)

```javascript
// app.js

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
```

- `routes` 페이지에서 다음과 같이 렌더링

```javascript
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index.html", { title: "Home" });
});
```

### .env 파일 세팅

- root 내에서 `.env.dev` 파일 생성

```env
# .env.development

NODE_ENV = dev
PORT = 8080
```

- `package.json` 파일 내 `scripts` 부분 다음과 같이 작성 (`--env-file=` 속성을 이용함)

```json
{
  "scripts": {
    "dev": "nodemon --env-file=.env.dev ./bin/www",
    "start": "nodemon ./bin/www",
  },
}
```

- `./bin/www` 파일에서 env 파일의 환경 변수를 불러올 수 있음

  * refactoring ./bin/www

### Refactor Directory & `app.js`

```
\(root)
└ bin 📁
  www
└ database 📁
  └ connect 📁
    maria.js
└ public 📁 
└ routes 📁 
  api.js
  index.js
  users.js
└ views 📁   << template(ejs)
  index.html
└ .env.dev
└ app.js
```

- `./bin/www`

```javascript
const app = require("../app");
const http = require("http");

const server = http.createServer(app);

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const onListening = () => {
  console.log(`✅ Server Listening on port http://localhost:${PORT} 👾`);
};

/**
* Event listener for HTTP server "error" event.
*/
const onError = (err) => {
  // error func
};

/**
* dev 환경에서의 서버 실행
*/
const setDevelopEnv = () => {
  app.listen(PORT, onListening);
};

/**
* 기존 템플릿 코드
*/
const setDefaultEnv = () => {
  app.set("port", PORT);

  server.listen(PORT);
  server.on("error", onError);
  server.on("listening", onListening);
};

if (ENV === "dev") {
  setDevelopEnv();
} else {
  setDefaultEnv();
}
```

- `app.js`

```javascript
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

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);

module.exports = app;
```
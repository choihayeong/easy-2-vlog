const maria = require("mysql");

const conn = maria.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234!",
  database: "easy_2_vlog",
});

module.exports = conn;

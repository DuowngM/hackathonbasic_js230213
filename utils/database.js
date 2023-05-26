const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  database: "blog",
  user: "root",
  password: "duong15032001",
});

let database = pool.promise();

module.exports = database;

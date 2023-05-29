import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

const MYSQL_USER = process.env.USERNAME;
const MYSQL_PASSWORD = process.env.PASSWORD;
const MYSQL_DATABASE = process.env.DATABASE;

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

db.connect(function (err) {
  if (err) throw err;
  const sql = "drop database sistema_de_vendas";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Banco deletado");
  });
});

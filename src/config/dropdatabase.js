import mysql from "mysql";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "rio",
  password: "Im1ssil123",
  database: "sistema_de_vendas",
});

db.connect(function (err) {
  if (err) throw err;
  const sql = "drop database sistema_de_vendas";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Banco deletado");
  });
});

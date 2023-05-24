import mysql from "mysql";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "rio",
  password: "Im1ssil123",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  db.query("CREATE DATABASE IF NOT EXISTS sistema_de_vendas", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  const con_database = "USE sistema_de_vendas";
  db.query(con_database, function (err, result) {
    if (err) throw err;
    console.log("Usando database!");
  });
  const usuarios = "CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT, nome_completo VARCHAR(45), login VARCHAR(45), senha VARCHAR(45), email VARCHAR(45), telefone VARCHAR(45), estado VARCHAR(45), cidade VARCHAR(45), link_foto_perfil VARCHAR(45), PRIMARY KEY (id))";
  db.query(usuarios, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  const vendas = "CREATE TABLE IF NOT EXISTS vendas (id INT AUTO_INCREMENT PRIMARY KEY, nome_empresa VARCHAR(45), nome_cliente VARCHAR(45), cnpj VARCHAR(45), telefone VARCHAR(45), valor_total FLOAT, valor_frete FLOAT, nome_produto VARCHAR(45), quantidade INT, compensada INT, usuarios_id INT, FOREIGN KEY (usuarios_id) REFERENCES usuarios(id))";
  db.query(vendas, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});



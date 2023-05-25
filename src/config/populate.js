import mysql from "mysql";

export const db = mysql.createPool({
  host: "127.0.0.1",
  user: "rio",
  password: "Im1ssil123",
  database: "sistema_de_vendas",
});

export function populateUsers(req, res) {
  db.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO usuarios (`nome_completo`, `login`, `senha`, `email`, `telefone`, `estado`, `cidade`) VALUES ?";
    var values = [
      [
        "Helen C. Sherman",
        "Excirs",
        "Ahk5aekiuth",
        "HelenCSherman@rhyta.com",
        "502-240-0129",
        "Kentucky",
        "Louisville",
      ],
      [
        "John P. Frazier",
        "Gund1965",
        "eeveeXi1",
        "JohnPFrazier@armyspy.com",
        "908-232-9058",
        "Indiana",
        "Westfield",
      ],
      [
        "Eric A. Pendleton",
        "Parld2004",
        "ooghie9Heega",
        "EricAPendleton@dayrep.com",
        "724-817-4360",
        "Pennsylvania",
        "Gibsonia",
      ],
      [
        "Lourdes M. Christensen",
        "Moseeld49",
        "Aipai7Uj5",
        "LourdesMChristensen@teleworm.us",
        "979-298-0393",
        "Texas",
        "San Angelo",
      ],
      [
        "Drucilla W. Pfeiffer",
        "Equed1964",
        "Cheig9uuz",
        "DrucillaWPfeiffer@rhyta.com",
        "608-637-9960",
        "Wisconsin",
        "Viroqua",
      ],
    ];
    connection.query(sql, [values], function (err, result) {
      connection.release();
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.status(200).send([{ message: "Usuários populados com sucesso"}])
    });
  });
}

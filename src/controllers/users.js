import { db } from "../config/db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    if (data.length != 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).send({ message: "Usuários não encontrados" });
    }
  });
};


export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    if (result.affectedRows == 0) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }
    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const getUserById = (req, res) => {
  const q = "SELECT * FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    } else {
      return res.status(200).json(data);
    }
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios (`nome_completo`, `login`, `senha`, `email`, `telefone`, `estado`, `cidade`) VALUES(?)";

  const values = [
    req.body.nome_completo,
    req.body.login,
    req.body.senha,
    req.body.email,
    req.body.telefone,
    req.body.estado,
    req.body.cidade,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json(values);
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome_completo` = ?, `login` = ?, `senha` = ?, `email` = ?, `telefone` = ?, `estado` = ?, `cidade` = ? WHERE `id` = ?";

  const values = [
    req.body.nome_completo,
    req.body.login,
    req.body.senha,
    req.body.email,
    req.body.telefone,
    req.body.estado,
    req.body.cidade,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import auth_login from "../config/auth.js";

const blacklist = [];

export function logoutUser(req, res) {
  blacklist.push(req.headers["x-access-token"]);
  res.status(200).send([{ message: "logout" }]);
  res.end();
}

export function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  const index = blacklist.findIndex((item) => item === token);
  if (index !== -1) return res.status(401).end();
  jwt.verify(token, auth_login.secret, (err, decoded) => {
    if (err) return res.status(401).end();

    req.userId = decoded.userId;
    next();
  });
}

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

export const loginUser = (req, res) => {
  var q = "SELECT * FROM usuarios WHERE `login` = ? AND `senha` LIKE ?";

  const values = [req.body.login, req.body.senha];
  db.query(q, [...values], function (err, results) {
    if (results.length > 0) {
      const token = jwt.sign({ userId: 1 }, auth_login.secret, {
        expiresIn: 600,
      });
      return res.status(200).json({ auth: true, token });
    } else {
      return res.status(403).send({ message: "login inválido!" });
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

    return res.status(200).json(data);
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

    return res.status(200).json("Usuário criado com sucesso.");
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

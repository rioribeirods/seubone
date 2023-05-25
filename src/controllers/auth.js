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
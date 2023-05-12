import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
  loginUser,
  verifyJWT,
  logoutUser
} from "../controllers/users.js";

const router = express.Router();

router.get("/test", verifyJWT, (req, res) => {
  res.json([{ message: "sucess" }]);
});

router.get("/:id", verifyJWT, getUserById);

router.get("/", getUsers);

router.post("/", addUser);

router.post("/login", loginUser);

const blacklist = [];

router.post("/logout", logoutUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

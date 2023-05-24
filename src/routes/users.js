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

router.get("/:id", verifyJWT, getUserById);

router.get("/", getUsers);

router.post("/", addUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

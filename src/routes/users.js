import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
} from "../controllers/users.js";
import { 
  loginUser, 
  verifyJWT, 
  logoutUser 
} from "../controllers/auth.js";

const router = express.Router();

router.get("/users/:id", verifyJWT, getUserById);

router.get("/users/", getUsers);

router.post("/users/", addUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;

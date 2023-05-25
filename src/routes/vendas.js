import express from "express";
import {
  addVenda,
  deleteVenda,
  getVendas,
  updateVenda,
  getVendaById,
} from "../controllers/vendas.js";
import { 
  loginUser, 
  verifyJWT, 
  logoutUser 
} from "../controllers/auth.js";

const router = express.Router();

router.get("/vendas/:id", verifyJWT, getVendaById);

router.get("/vendas/", getVendas);

router.post("/vendas/", addVenda);

router.put("/vendas/:id", updateVenda);

router.delete("/vendas/:id", deleteVenda);

export default router;

import express from "express";
import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = express.Router();

import {
  listarGastos,
  crearGasto,
  vistaGastos,
  vistaNuevoGasto,
} from "../controllers/gastosController.js";

router.get("/vista", protegerRuta, vistaGastos);
router.get("/nuevo", protegerRuta, vistaNuevoGasto);

router.get("/", listarGastos);
router.post("/", crearGasto);

export default router;

import express from "express";

const router = express.Router();

import {
  listarGastos,
  crearGasto,
  vistaGastos,
  vistaNuevoGasto,
} from "../controllers/gastosController.js";

router.get("/vista", vistaGastos);
router.get("/nuevo", vistaNuevoGasto);

router.get("/", listarGastos);
router.post("/", crearGasto);

export default router;

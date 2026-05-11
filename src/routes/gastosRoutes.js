import express from "express";

const router = express.Router();

const {
  listarGastos,
  crearGasto,
  vistaGastos,
  vistaNuevoGasto,
} = require("../controllers/gastosController");

router.get("/vista", vistaGastos);
router.get("/nuevo", vistaNuevoGasto);

router.get("/", listarGastos);
router.post("/", crearGasto);

export default router;
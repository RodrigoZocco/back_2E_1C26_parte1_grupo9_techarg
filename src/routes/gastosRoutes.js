const express = require("express");

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

module.exports = router;
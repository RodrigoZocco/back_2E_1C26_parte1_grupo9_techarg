const express = require("express");

const router = express.Router();

const {
  listarObras,
  obtenerObra,
  crearObra,
  vistaObras,
  vistaDetalleObra,
} = require("../controllers/obrasController");

router.get("/", listarObras);
router.post("/", crearObra);
router.get("/nuevo", (req, res) => {
  res.render("nuevaObra");
});
router.get("/vista", vistaObras);
router.get("/:id", obtenerObra);
router.get("/:id/vista", vistaDetalleObra);

module.exports = router;

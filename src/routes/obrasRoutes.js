import express from "express";

const router = express.Router();

import {
  listarObras,
  obtenerObraPorId,
  crearObra,
  vistaObras,
  vistaDetalleObra,
} from "../controllers/obrasController.js";

router.get("/", listarObras);
router.post("/", crearObra);
router.get("/nuevo", (req, res) => {
  res.render("nuevaObra");
});
router.get("/vista", vistaObras);
router.get("/:id", obtenerObraPorId);
router.get("/:id/vista", vistaDetalleObra);

export default router;

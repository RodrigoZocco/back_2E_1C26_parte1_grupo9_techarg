import express from "express";
import { protegerRuta } from "../middlewares/authMiddleware.js";
import {
  listarObras,
  obtenerObraPorId,
  crearObra,
  vistaNuevaObra,
  vistaObras,
  vistaDetalleObra,
} from "../controllers/obrasController.js";

const router = express.Router();

router.get("/", listarObras);
router.post("/", crearObra);
router.get("/nuevo", protegerRuta, vistaNuevaObra);
router.get("/vista", protegerRuta, vistaObras);
router.get("/:id", obtenerObraPorId);
router.get("/:id/vista", protegerRuta, vistaDetalleObra);

export default router;

import expres from "express";
import { protegerRuta, requerirAdmin } from "../middlewares/authMiddleware.js";
import { listarUsuariosVista, verDetalleUsuario, actualizarUsuario, bajaUsuario } from "../controllers/usuarioController.js";

const router = expres.Router();

router.get("/vista", protegerRuta, requerirAdmin, listarUsuariosVista);
router.get("/:id/vista", protegerRuta, requerirAdmin, verDetalleUsuario);
router.post("/:id/editar", protegerRuta, requerirAdmin, actualizarUsuario);
router.post("/:id/baja", protegerRuta, requerirAdmin, bajaUsuario);

export default router;
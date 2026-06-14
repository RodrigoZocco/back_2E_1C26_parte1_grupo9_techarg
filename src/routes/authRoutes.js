import express from "express";
import { mostrarLogin, mostrarRegistro, iniciarSesion, registrarUsuario, logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.get("/registro", mostrarRegistro);
router.post("/login", iniciarSesion);
router.post("/registro", registrarUsuario);
router.get("/logout", logout);

export default router;
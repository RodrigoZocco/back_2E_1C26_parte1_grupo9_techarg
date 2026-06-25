import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import obrasRoutes from "./routes/obrasRoutes.js";
import gastosRoutes from "./routes/gastosRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import conectarDB from "./config/db.js";
import { protegerRuta } from "./middlewares/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Esto para leer datos desde los forms HTML con method=POST (como mostro el profesor en clase)
app.use(express.urlencoded({ extended: true }));

// Config de PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde la carpeta public como CSS o imágenes.
app.use(express.static(path.join(__dirname, "..", "public")));

// rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/obras", obrasRoutes);
app.use("/gastos", gastosRoutes);

app.get("/", protegerRuta, (req, res) => {
  res.render("index", { usuario: req.usuario });
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Vercel como lo ejecuta de forma serverless reusa esto en cada invocacion
await conectarDB();

// Exportamos la app, para la estructura serverless de vercel
export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

/*
// Esto es de la 1º y 2º iteracion
// No lo usamos mas ya que preparamos el codigo para una estructura serverless en la 3º iteracion
const iniciarServidor = async () => {
  try {
    console.log("Iniciando el servidor...");
    await conectarDB();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

iniciarServidor();
*/
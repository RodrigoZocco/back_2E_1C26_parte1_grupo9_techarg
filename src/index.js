import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import obrasRoutes from "./routes/obrasRoutes.js";
import gastosRoutes from "./routes/gastosRoutes.js";
import conectarDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

const obrasRoutes = require("./routes/obrasRoutes");
const gastosRoutes = require("./routes/gastosRoutes");

app.use(express.json());
// Esto para leer datos desde los forms HTML con method=POST (como mostro el profesor en clase)
app.use(express.urlencoded({ extended: true }));

// Config de PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde la carpeta public como CSS o imágenes. (No lo usamos, pero para que este a futuro)
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.use("/obras", obrasRoutes);
app.use("/gastos", gastosRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

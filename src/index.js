require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// Esto para leer datos desde los forms HTML con method=POST (como mostro el profesor en clase)
app.use(express.urlencoded({ extended: true }));

// Config de PUG 
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde la carpeta public como CSS o imágenes. (No lo usamos, pero para que este a futuro)
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function (req, res) {
  res.send('Probandolo y funciona');
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});

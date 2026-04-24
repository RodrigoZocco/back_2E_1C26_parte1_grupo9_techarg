const fs = require("fs");
const path = require("path");
const Obra = require("../models/Obra");
const rutaArchivo = path.join(__dirname, "../data/obras.json");

const leerObras = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

const guardarObras = (obras) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(obras, null, 2));
};

const listarObras = (req, res) => {
  const obras = leerObras();
  res.json(obras);
};

const obtenerObra = (req, res) => {
  const obras = leerObras();
  const obra = obras.find((o) => o.id == req.params.id);

  if (!obra) {
    return res.status(404).json({ error: "Obra no encontrada" });
  }

  res.json(obra);
};

const crearObra = (req, res) => {
  const { nombre, director, ubicacion, fechaEstimadaFin, presupuestoTotal } = req.body;

  if (!nombre || !director || !ubicacion || !fechaEstimadaFin || !presupuestoTotal) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const obras = leerObras();

  const nuevaObra = new Obra(
    Date.now(),
    nombre,
    director,
    ubicacion,
    fechaEstimadaFin,
    Number(presupuestoTotal)
  );

  obras.push(nuevaObra);
  guardarObras(obras);

  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    return res.redirect("/obras/vista");
  }

  res.status(201).json(nuevaObra);
};

const vistaObras = (req, res) => {
  const obras = leerObras();
  res.render("obras", { obras });
};

const vistaDetalleObra = (req, res) => {
  const obras = leerObras();
  const obra = obras.find((o) => o.id == req.params.id);

  if (!obra) {
    return res.status(404).send("Obra no encontrada");
  }

  const pTotal = obra.presupuestoTotal;
  const pDisponible = obra.presupuestoDisponible;
  const presupGastado = pTotal - pDisponible;

  res.render("detalleObra", { obra, presupGastado });
};

module.exports = {
  listarObras,
  obtenerObra,
  crearObra,
  vistaObras,
  vistaDetalleObra,
};

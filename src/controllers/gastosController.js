const fs = require("fs");
const path = require("path");
const Gasto = require("../models/Gasto");
const rutaArchivo = path.join(__dirname, "../data/gastos.json");

const leerGastos = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

const guardarGastos = (gastos) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(gastos, null, 2));
};

const listarGastos = (req, res) => {
  const gastos = leerGastos();
  res.json(gastos);
};

const crearGasto = (req, res) => {
  const { obraId, concepto, monto, fecha, medioPago } = req.body;

  if (!obraId || !concepto || !monto || !fecha || !medioPago) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const gastos = leerGastos();

  const nuevoGasto = new Gasto(
    Date.now(),
    Number(obraId),
    concepto,
    Number(monto),
    fecha,
    medioPago
  );

  gastos.push(nuevoGasto);
  guardarGastos(gastos);

  res.status(201).json(nuevoGasto);
};

const vistaGastos = (req, res) => {
  const gastos = leerGastos();
  res.render("gastos", { gastos });
};

const vistaNuevoGasto = (req, res) => {
  res.render("nuevoGasto");
};

module.exports = {
  listarGastos,
  crearGasto,
  vistaGastos,
  vistaNuevoGasto,
};

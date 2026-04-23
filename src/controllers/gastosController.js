const fs = require("fs");
const path = require("path");
const Gasto = require("../models/Gasto");
const rutaArchivo = path.join(__dirname, "../data/gastos.json");

const leerGastos = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

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

  const montoNumero = Number(monto);

  if (isNaN(montoNumero) || montoNumero <= 0) {
    return res.status(400).json({ error: "Monto inválido" });
  }
  //Leemos los gastos
  const gastos = leerGastos();

  // leemos las obras guardadas
  const rutaObras = path.join(__dirname, "../data/obras.json");
  const obras = JSON.parse(fs.readFileSync(rutaObras, "utf-8"));

  // buscamos la obra en cuestion
  const obra = obras.find(o => o.id == obraId);

  if (!obra) {
    return res.status(400).json({ error: "La obra no existe" });
  }
  
  // Validamos el presupuesto
  if (obra.presupuestoDisponible < montoNumero) {
    return res.status(400).json({ error: "El gasto supera el presupuesto disponible" });
  }

  // creamos el nuevo gasto
  const nuevoGasto = new Gasto(
    Date.now(),
    Number(obraId),
    concepto,
    montoNumero,
    fecha,
    medioPago
  );

  // Se guarda el gasto
  gastos.push(nuevoGasto);
  guardarGastos(gastos);

  // se descuenta el monto del disponible
  obra.presupuestoDisponible -= montoNumero;

  // se guarda la obra actualizada
  fs.writeFileSync(rutaObras, JSON.stringify(obras, null, 2));

  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    //return res.redirect("/gastos/vista");
    return res.redirect(`/obras/${obraId}/vista`);
  }

  res.status(201).json(nuevoGasto);
};

const vistaGastos = (req, res) => {
  const gastos = leerGastos();
  res.render("gastos", { gastos });
};

const vistaNuevoGasto = (req, res) => {
  const obraId = req.query.obraId || "";

  const rutaObras = path.join(__dirname, "../data/obras.json");
  const obras = JSON.parse(fs.readFileSync(rutaObras, "utf-8"));

  res.render("nuevoGasto", { obraId, obras });
};

module.exports = {
  listarGastos,
  crearGasto,
  vistaGastos,
  vistaNuevoGasto,
};

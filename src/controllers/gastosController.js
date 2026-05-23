import Gasto from "../models/Gasto.js";
import Obra from "../models/Obra.js";
import fs from "fs/promises";

const listarGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find().populate("idObra");
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener gastos" });
  }
};

const crearGasto = async (req, res) => {
  try {
    const { obraId, concepto, monto, fecha, medioPago } = req.body;

    if (!obraId || !concepto || !monto || !fecha || !medioPago) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const montoNumero = Number(monto);

    if (isNaN(montoNumero) || montoNumero <= 0) {
      return res.status(400).json({ error: "Monto inválido" });
    }

    // 1. Buscamos la obra para validar el presupuesto
    const obra = await Obra.findById(obraId);
    if (!obra) {
      return res.status(404).json({ error: "La obra no existe" });
    }

    // 2. Validamos el presupuesto disponible
    const disponible = obra.p;
    if (obra.presupuestoDisponible < montoNumero) {
      return res
        .status(400)
        .json({ error: "El gasto supera el presupuesto disponible" });
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

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect(`/obras/${obraId}/vista`);
    }

    res.status(201).json(nuevoGasto);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al registrar el gasto: " + error.message });
  }
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

export { listarGastos, crearGasto, vistaGastos, vistaNuevoGasto };

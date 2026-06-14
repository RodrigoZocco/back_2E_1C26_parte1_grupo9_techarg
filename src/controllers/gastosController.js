import Gasto from "../models/Gasto.js";
import Obra from "../models/Obra.js";
import fs from "fs/promises";

const listarGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find().populate("obraId");
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
    if (obra.presupuestoDisponible < montoNumero) {
      return res
        .status(400)
        .json({ error: "El gasto supera el presupuesto disponible" });
    }

    // creamos el nuevo gasto
    const nuevoGasto = new Gasto({
      obraId,
      concepto,
      monto: montoNumero,
      fecha,
      medioPago,
      categoria: "gasto de obra",
    });

    await nuevoGasto.save();
    obra.presupuestoDisponible -= montoNumero;
    await obra.save();

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

const vistaGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find().populate("obraId");

    res.render("gastos", { gastos, usuario: req.usuario });
  } catch (error) {
    res.status(500).send("Error al cargar gastos");
  }
};

const vistaNuevoGasto = async (req, res) => {
  try {
    const obraId = req.query.obraId || "";
    const obras = await Obra.find();

    res.render("nuevoGasto", {
      obraId,
      obras,
      usuario: req.usuario
    });
  } catch (error) {
    res.status(500).send("Error al cargar formulario");
  }
};

export { listarGastos, crearGasto, vistaGastos, vistaNuevoGasto };

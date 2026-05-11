import Obra from "../models/Obra.js";
import fs from "fs/promises";
const path = require("path");
const rutaArchivo = path.join(__dirname, "../data/obras.json");

const listarObras = async (req, res) => {
  try {
    const obras = await Obra.find();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las obras" });
  }
};

const obtenerObraPorId = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }
    res.json(obra);
  } catch (error) {
    res.status(500).json({ error: "ID de obra inválido o error de servidor" });
  }
};

const crearObra = async (req, res) => {
  const { nombre, director, ubicacion, fechaEstimadaFin, presupuestoTotal } = req.body;

  try {
    const nuevaObra = new Obra({
      nombre,
      director,
      ubicacion,
      fechaEstimadaFin,
      presupuestoTotal: Number(presupuestoTotal),
    });

    await nuevaObra.save();

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/obras/vista");
    }

    res.status(201).json(nuevaObra);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la obra: " + error.message });
  }
};

const vistaObras =async (req, res) => {
  try {
    const obras = await Obra.find();
    res.render("obras", { obras });
  } catch (error) {
    res.status(500).send("Error al cargar la vista");
  }
};

const 

const vistaDetalleObra = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);

    if (!obra) {
      return res.status(404).send("Obra no encontrada");
    }

    const pTotal = obra.presupuestoTotal;
    const pDisponible = obra.presupuestoDisponible;
    const presupGastado = pTotal - pDisponible;

    res.render("detalleObra", { obra, presupGastado, pDisponible });
  } catch (error) {
    res.status(500).send("Error al cargar el detalle");
  }
};

export {
  listarObras,
  obtenerObraPorId,
  crearObra,
  vistaDetalleObra,
  vistaObras
};
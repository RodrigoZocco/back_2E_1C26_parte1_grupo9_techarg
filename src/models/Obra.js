import { Schema, model } from "mongoose";

const obraSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  fechaAlta: {
    type: Date,
    default: Date.now,
  },
  fechaEstimadaFin: {
    type: Date,
  },
  presupuestoTotal: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ["Activa", "Pausada", "Finalizada", "Cancelada"],
    default: "Activa",
  },
});

export default model("Obra", obraSchema);

//this.presupuestoDisponible = presupuestoTotal;

import { Schema, model } from "mongoose";

const gastoSchema = new Schema({
  obraId: {
    type: Schema.Types.ObjectId,
    ref: 'Obra',
    required: true
  },
  concepto: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  medioPago: {
    type: String,
    enum: ['Cheque', 'Transferencia', 'Efectivo'],
    required: true
  },
  categoria: {
    type: String,
    required: true
  }
});

export default model('Gasto', gastoSchema);

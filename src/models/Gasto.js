class Gasto {
  constructor(id, obraId, concepto, monto, fecha, medioPago) {
    this.id = id;
    this.obraId = obraId;
    this.concepto = concepto;
    this.monto = monto;
    this.fecha = fecha;
    this.medioPago = medioPago; // Esto es "cheque" o "transferencia", como indica el caso nuestro (Cimientos Sólidos S.A)
  }
}

module.exports = Gasto;

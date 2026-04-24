class Obra {
  constructor(id, nombre, director, ubicacion, fechaEstimadaFin, presupuestoTotal) {
    this.id = id;
    this.nombre = nombre;
    this.director = director;
    this.ubicacion = ubicacion;
    this.fechaAlta = new Date().toISOString().split('T')[0];
    this.fechaEstimadaFin = fechaEstimadaFin;
    this.presupuestoTotal = presupuestoTotal;
    this.presupuestoDisponible = presupuestoTotal;
    this.estado = "Activa";
  }
}

module.exports = Obra;

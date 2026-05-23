import mongoose from "mongoose";

const ESPERA_CONEXION_MONGOOSE_MAXIMO_MS = 3000; // 3 Segundos

const conectarDB = async () => {
  try {
    console.log("Conectandose a MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: ESPERA_CONEXION_MONGOOSE_MAXIMO_MS,
    });
    console.log("Conectado a MongoDb con exito");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default conectarDB;

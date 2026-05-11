import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error(' Error al conectarse a MongoDB: ', error);
        process.exit(1);
    }
};

export default conectarDB;
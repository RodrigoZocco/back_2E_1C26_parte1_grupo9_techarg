import "dotenv/config";
import mongoose from "mongoose";
import Usuario from "./models/Usuario.js";
import crypto from "crypto";
// Asegúrate de cambiar la ruta a tu archivo de configuración de base de datos si es necesario
import conectarDB from "./config/db.js"; 

const crearAdminInicial = async () => {
    try {
        // 1. Conectamos temporalmente a la base de datos
        await conectarDB();

        // 2. Verificamos si ya existe algún administrador para no duplicar datos
        const adminExiste = await Usuario.findOne({ rol: "Administrador" });
        if (adminExiste) {
            console.log("⚠️ Ya existe un usuario Administrador en la base de datos.");
            process.exit(0);
        }

        // 3. Generamos las credenciales seguras usando la lógica de tu modelo
        const passwordPlano = "Admin1234"; // Esta será tu contraseña temporal para el primer ingreso
        const salt = crypto.randomBytes(16).toString("hex");
        const passwordHash = crypto
            .pbkdf2Sync(passwordPlano, salt, 10000, 64, "sha512")
            .toString("hex");

        // 4. Creamos la instancia del superusuario
        const superAdmin = new Usuario({
            nombre: "Admin General",
            email: "admin@cimientos.com",
            passwordHash,
            salt,
            rol: "Administrador",
            activo: true
        });

        // 5. Guardamos en MongoDB
        await superAdmin.save();
        
        console.log("=========================================");
        console.log("🚀 ¡Usuario Administrador creado con éxito!");
        console.log("📧 Email: admin@cimientos.com");
        console.log("🔑 Contraseña: Admin1234");
        console.log("=========================================");
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error al correr el seed de administración:", error);
        process.exit(1);
    }
};

crearAdminInicial();
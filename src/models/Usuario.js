import crypto from "crypto";
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    sesionToken: {
        type: String,
        default: null
    },
    rol: {
        type: String,
        enum: ["Administrador", "DirectorObra"],
        default: "DirectorObra"
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaBaja: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

usuarioSchema.methods.validarPassword = function(password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
        .toString("hex");
    //Compara el hash generado con el hash guardado en la base de datos
    return this.passwordHash === hash;
};

usuarioSchema.statics.crearPasswordSeguro = function(password) {
    //Genera un salt aleatorio de 16 bytes
    const salt = crypto.randomBytes(16).toString("hex");
    //Genera el hash seguro de la contraseña
    const passwordHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    //Devuelve ambos valores para guardar en la base de datos
    return { salt, passwordHash };
};

export default mongoose.model("Usuario", usuarioSchema);
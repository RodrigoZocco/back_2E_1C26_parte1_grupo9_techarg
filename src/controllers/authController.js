import crypto from "crypto";
import Usuario from "../models/Usuario.js";

const mostrarLogin = (req, res) => {
    res.render("login", {
        error: null
    });
};

const mostrarRegistro = (req, res) => {
    res.render("registro", {
        error: null
    });
};

const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Buscamos al usuario por email
        const usuario = await Usuario.findOne({ email: email.toLowerCase() });

        //si no existe o la contraseña no es válida, lo mandamos devuelta al login
        if (!usuario || !usuario.validarPassword(password)) {
            return res.render("login", {
                error: "Email o clave incorrectos"
            });
        }

        //Si es correcto, creamos la sesión en el servidor
        const token = crypto.randomBytes(32).toString("hex");
        usuario.sesionToken = token;
        await usuario.save();

        //Enviamos la cookie al navegador
        res.cookie("sesion", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 // La sesion dura 1 hora
        })

        res.redirect("/");

    } catch (error) {
        res.render("login", {
            error: "Error al iniciar sesion"
        });
    }
};

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.render("registro", {
                error: "Todos los campos son obligatorios"
            });
        }
        //Validamos si el email ya existe
        const usuarioExiste = await Usuario.findOne({ email: email.toLowerCase() });

        if (usuarioExiste) {
            return res.render("registro", {
                error: "Ese email ya está registrado"
            });
        }

        //Usamos el metodo para generar salt y hash con crypto
        const { salt, passwordHash } = Usuario.crearPasswordSeguro(password);

        //Creamos la nueva instancia en la base de datos
        await Usuario.create({
            nombre,
            email,
            passwordHash,
            salt,
            rol
        });

        res.redirect("/usuarios/vista");

    } catch (error) {
        res.render("registro", {
            error: "Error al registrar usuario"
        });
    }
};

const logout = async (req, res) => {
    if (req.usuario) {
        req.usuario.sesionToken = null;
        await req.usuario.save();
    }
    res.clearCookie("sesion");
    res.redirect("/auth/login");
};

export {
    mostrarLogin,
    mostrarRegistro,
    iniciarSesion,
    registrarUsuario,
    logout
};
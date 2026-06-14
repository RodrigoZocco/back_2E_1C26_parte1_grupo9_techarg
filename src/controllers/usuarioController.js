import Usuario from "../models/Usuario.js";

const listarUsuariosVista = async (req, res) => {
    try {
        const usuarios = await Usuario.find({ _id: { $ne: req.usuario._id } });
        res.render("usuarios", {
            usuarios,
            usuario: req.usuario
        });
    } catch (error) {
        res.status(500).send("Error al cargar la lista de usuarios");
    }
};

const verDetalleUsuario = async (req, res) => {
    try {
        const usuarioEditar = await Usuario.findById(req.params.id);
        if (!usuarioEditar) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.render("detalleUsuario", {
            usuarioEditar,
            usuario: req.usuario
        });

    } catch (error) {
        res.status(500).send("Error al cargar el detalle");
    }
};

const actualizarUsuario = async (req, res) => {
    const { nombre, rol } = req.body;
    try {
        await Usuario.findByIdAndUpdate(req.params.id, {
            nombre,
            rol
        });

        res.redirect("/usuarios/vista");

    } catch (error) {
        res.status(400).send("Error al actualizar usuario");
    }
};

const bajaUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndUpdate(req.params.id, {
            activo: false,
            fechaBaja: new Date(),
            sesionToken: null
        });

        res.redirect("/usuarios/vista");

    } catch (error) {
        res.status(500).send("Error al procesar la baja del usuario");
    }
};

export {
    listarUsuariosVista,
    verDetalleUsuario,
    actualizarUsuario,
    bajaUsuario
};
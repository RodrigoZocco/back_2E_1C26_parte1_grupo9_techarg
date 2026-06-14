import Usuario from "../models/Usuario.js";

const leerCookies = (req) => {
    const header = req.headers.cookie;

    if (!header) {
        return {};
    }

    return header.split(";").reduce((cookies, cookie) => {
        const [nombre, valor] = cookie.trim().split("=");
        cookies[nombre] = decodeURIComponent(valor);
        return cookies;
    }, {});
};

const protegerRuta = async (req, res, next) => {
    const cookies = leerCookies(req);
    const sesionToken = cookies.sesion;

    //Si no existe la cookie de sesion, rebota al login
    if (!sesionToken) {
        return res.redirect("/auth/login");
    }

    //Buscamos al usuario que tenga asignado ese token en la base de datos
    const usuario = await Usuario.findOne({ sesionToken });

    //Si el token expiró o el usuario no está activo, limpiamos la cookie y redirigimos
    if (!usuario || !usuario.activo) {
        res.clearCookie("sesion");
        return res.redirect("/auth/login");
    }

    // Guardamos el usuario completo en el objeto 'req' para usarlo en los controladores
    req.usuario = usuario;
    next();
};

const requerirAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === "Administrador") {
        return next();
    }

    //Si no es Administrador, bloqueamos el acceso
    res.status(403).send("Acceso denegado: Se requieren permisos de Administrador.");
};

export {
    protegerRuta,
    leerCookies,
    requerirAdmin
};
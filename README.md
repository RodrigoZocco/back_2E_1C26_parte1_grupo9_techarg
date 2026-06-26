# Caso 5: Constructora "Cimientos Sólidos SA”				
## Comision E - Grupo 9 (Luis Barnabo y Rodrigo Zocco)

Aplicación web desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, gastos y obras. El sistema permite administrar la información de manera centralizada mediante una arquitectura MVC, implementando autenticación de usuarios, validaciones y persistencia de datos en MongoDB Atlas.

---

# Integrantes

| Integrante | Rol |
|------------|-----|
| Luis Barnabo | Autenticacion, manejo de sesiones y modulo de gastos |
| Rodrigo Zocco | Vistas, modulo de obras, mongodb atlas y deploy |
| Ambos | Si bien establecimos una división de responsabilidades, hicimos el desarrollo colaborando entre nosotros y refactorizando cosas a medida que encontrabamos mejoras en el sistema |

---

# Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- pug
- crypto
- nodemon (dev dependency)

---

# Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Gestión de usuarios y autenticación de sesiones y operaciones mediante rol.
- Alta y consulta de gastos.
- Alta y consulta de obras.
- Validación de datos mediante middlewares.
- Persistencia de datos utilizando MongoDB Atlas.
- Arquitectura MVC para organizar el proyecto.

---

# Arquitectura del proyecto

El proyecto sigue el patrón de arquitectura **MVC (Model - View - Controller)**.

```
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── gastosController.js
│   ├── obrasController.js
│   └── usuarioController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   ├── Gasto.js
│   ├── Obra.js
│   └── Usuario.js
│
├── public/
│
├── routes/
│   ├── authRoutes.js
│   ├── gastosRoutes.js
│   ├── obrasRoutes.js
│   └── usuarioRoutes.js
│
├── views/
│
├── index.js
```

### Descripción de las carpetas

- **config:** configuración de la base de datos.
- **controllers:** lógica de negocio de cada módulo.
- **middlewares:** validaciones y control de acceso.
- **models:** modelos de Mongoose.
- **public:** archivos estáticos.
- **routes:** definición de rutas.
- **views:** vistas PUG.
- **index.js:** punto de entrada de la aplicación.

---

# Instalación

Clonar el repositorio.

```bash
git clone https://github.com/RodrigoZocco/back_2E_1C26_parte1_grupo9_techarg.git
```

Ingresar al proyecto.

```bash
cd back_2E_1C26_parte1_grupo9_techarg
```

Ir a la rama de la iteracion final.

```bash
git checkout Entrega-3
```

Instalar las dependencias.

```bash
npm install
```

Configurar variables de entorno (ver aparatado debajo).

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=

MONGODB_URI=
```

---

# Ejecución

Modo desarrollo (con recarga rapida usando nodemon):

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

# Endpoints principales

## Autenticación

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /auth/registro | Formulario de registro |
| GET | /auth/login | Formulario de inicio de sesión |
| POST | /auth/login | Iniciar sesión |
| POST | /auth/registro | Registrarse |
| GET | /auth/logout | Cerrar sesión |

## Gastos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /gastos/vista | Vista de gastos |
| GET | /gastos/nuevo | Formulario para agregar gastos |
| POST | /gastos | Crear gasto |
| GET | /gastos | Listar gastos |

## Obras

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /obras | Lista de obras |
| POST | /obras | Crear obra |
| GET | /obras/nuevo | Lista para crear nuevas obras |
| GET | /obras/vista | Vista que contiene las obras |
| GET | /obras/:id | Obtener obra por ID |
| GET | /obras/:id/vista | Vista de una única obra |

| PUT | /obras/:id | Modificar obra |
| DELETE | /obras/:id | Eliminar obra |

---

# Links Utiles

- **Aplicación:** [URL del sistema desplegado](https://back-2-e-1-c26-parte1-grupo9-techar.vercel.app/)
- **Repositorio Github:** [Ir a Github](https://github.com/RodrigoZocco/back_2E_1C26_parte1_grupo9_techarg/tree/Entrega-3)
- **Carpeta de Drive** [Ir a Drive](https://drive.google.com/drive/folders/1MzQhLsFPP6uH5L5yiQGHDg8encIXRh7x)

---
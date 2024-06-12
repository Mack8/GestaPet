const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const chalk = require ('chalk')
const prism = new PrismaClient();

//---Archivos de rutas---
const citaRouter = require("./routes/citaRoutes")
const estadoCitaRouter = require("./routes/estadoCitaRoutes")
const facturaRouter = require("./routes/facturaRoutes")
const horarioRouter = require("./routes/horarioRoutes")
const mascotaRouter = require("./routes/mascotaRoutes")
const productoRouter = require("./routes/productoRoutes")
const servicioRouter = require("./routes/servicioRoutes")
const sucursalRouter = require("./routes/sucursalRoutes")
const usuarioRouter = require("./routes/usuarioRoutes")

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
})
);
//---- Definir rutas ----
app.use("/cita/",citaRouter)
app.use("/estadoCita/",estadoCitaRouter)
app.use("/factura/",facturaRouter)
app.use("/horario/",horarioRouter)
app.use("/mascota/",mascotaRouter)
app.use("/producto/",productoRouter)
app.use("/servicio/",servicioRouter)
app.use("/sucursal/",sucursalRouter)
app.use("/usuario/",usuarioRouter)

// Servidor
app.listen(port, () => {
console.log(chalk.blue(`http://localhost:${port}`));
console.log(chalk.blue.bgRed("Presione CTRL-C para deternerlo\n"));
});
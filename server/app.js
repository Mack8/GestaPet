const dotEnv = require("dotenv");
const express = require("express");

require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const chalk = require("chalk");
const prisma = new PrismaClient();
const path = require("path");
const { getCitas } = require("./controllers/citaController");
const nodemailer = require("nodemailer");
var cron = require("node-cron");

var citas = [];

const simulateRequest = async () => {
  // Crea objetos simulados para req y res
  const req = {}; // Simula la solicitud (puede estar vacío si no se usa)
  const res = {
    json: (data) => {
      //console.log('Respuesta JSON:', data)
      citas = data;
    }, // Simula la función json() de la respuesta
    status: function (statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    send: (data) => console.log("Respuesta:", data), // Simula la función send() de la respuesta
  };

  try {
    // Llama a la función getCitas
    await getCitas(req, res);
  } catch (error) {
    console.error("Error al llamar a getCitas:", error);
  }
};

/* user: 'ofmaxavh3zrqjobr@ethereal.email',
pass: 'hSNAtuGK9AjyWKg8gE',
smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
imap: { host: 'imap.ethereal.email', port: 993, secure: true },
pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
web: 'https://ethereal.email',
mxEnabled: false */

/* nodemailer.createTestAccount().then(account =>{
    console.log(account);
})
 */
/* const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // Puedes usar otros servicios como 'smtp.mailgun.org' si no usas Gmail
  port: 587,
  secure: false,
  auth: {
    user: "ofmaxavh3zrqjobr@ethereal.email", // Tu dirección de correo
    pass: "hSNAtuGK9AjyWKg8gE", // Tu contraseña de correo
  },
});
 */


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });

cron.schedule("*/10 * * * * *", async () => {
  //    /*  simulateRequest().then(() => {
  //         console.log('Array de citas:', citas); // Usa el array de citas
  //     }).catch(error => {
  //         console.error('Error en simulateRequest:', error);
  //     }); */

  var mailOptions = {
    from:  process.env.EMAIL_USER,
    to: "sanchez.marcia2510@gmail.com",
    subject: "Prueba Correo",
    text: "Hola Mundo",
  };

  const info = await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  const fecha = new Date();
  const horasARestar = 6;
  fecha.setHours(fecha.getHours() - horasARestar);

  console.log("🚀 ~ cron.schedule ~ fecha:", fecha)

  console.log(new Date());

  const url = nodemailer.getTestMessageUrl(info);

  console.log(url);


});
 

global.__basedir = __dirname;

//---Archivos de rutas---
const citaRouter = require("./routes/citaRoutes");
const estadoCitaRouter = require("./routes/estadoCitaRoutes");
const facturaRouter = require("./routes/facturaRoutes");
const horarioRouter = require("./routes/horarioRoutes");
const mascotaRouter = require("./routes/mascotaRoutes");
const productoRouter = require("./routes/productoRoutes");
const servicioRouter = require("./routes/servicioRoutes");
const sucursalRouter = require("./routes/sucursalRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const fileRouter = require("./routes/fileRoutes");

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
app.use("/cita/", citaRouter);
app.use("/estadoCita/", estadoCitaRouter);
app.use("/factura/", facturaRouter);
app.use("/horario/", horarioRouter);
app.use("/mascota/", mascotaRouter);
app.use("/producto/", productoRouter);
app.use("/servicio/", servicioRouter);
app.use("/sucursal/", sucursalRouter);
app.use("/usuario/", usuarioRouter);
app.use("/file/", fileRouter);

app.use(
  "/images",
  express.static(path.join(path.resolve(), "/assets/uploads"))
);

// Servidor
app.listen(port, () => {
  console.log(chalk.blue(`http://localhost:${port}`));
  console.log(chalk.blue.bgRed("Presione CTRL-C para deternerlo\n"));
});

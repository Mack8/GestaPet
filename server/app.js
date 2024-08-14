const dotEnv = require("dotenv");
const express = require("express");
require("dotenv").config();
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
  var fecha = new Date();
  fecha.setHours(fecha.getHours() - 6);
  //fecha.setDate(fecha.getDate() + 1);
  const req = fecha; // Simula la solicitud 
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


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



function formateDate(date) {
  var dia = date.getDate();
  var mes = date.getMonth() + 1;
  var anio = date.getFullYear();
  return (
    (dia < 10 ? "0" + dia : dia) +
    "/" +
    (mes < 10 ? "0" + mes : mes) +
    "/" +
    anio
  );
}

function formateDate1(date) {
  date.setDate(date.getDate() + 1);
  var dia = date.getDate();
  var mes = date.getMonth() + 1;
  var anio = date.getFullYear();
  return (
    (dia < 10 ? "0" + dia : dia) +
    "/" +
    (mes < 10 ? "0" + mes : mes) +
    "/" +
    anio
  );
}

function formateTime(date) {
  var hora = date.substring(11, 13);
  var minutos = date.substring(14, 16);
  var amPm = hora >= 12 ? " PM" : " AM";
  hora = hora % 12;
  hora = hora ? hora : 12;

  return (
    (hora < 10 ? "0" + hora : hora) +
    ":" +
    (minutos < 10 ? "0" + minutos : minutos) +
    amPm
  );
}


cron.schedule("*/15 * * * * *", async () => {
  simulateRequest()
    .then(() => {
      console.log("Array de citas:", citas.length); // Usa el array de citas

      citas.forEach((element) => {
        var body =
        "<body>"+
          "<b>Estimado/a " +
          element.cliente.nombre +
          "</b>" +
          "<br/>" +
          "<br/>" +
          "Espero que este mensaje le encuentre bien." +
          "<br/>" +
          "<br/>" +
          "Le escribimos para recordarle su próxima cita en GestaPet, en la " +
          element.sucursal.nombre +
          ". A continuación, le proporcionamos los detalles de la cita:<br/><br/>" +
          "<ul>" +
          "<li><b>Fecha:</b> " +
          formateDate1(element.fecha) +
          "</li>" +
          "<li><b>Hora:</b> " +
          formateTime(element.horaInicio + "") +
          "</li>" +
          "<li><b>Mascota:</b> " +
          element.mascota.nombre +
          "</li>" +
          "</ul>" +
          "Por favor, llegue con unos 15 minutos de antelación para completar cualquier documentación necesaria y para que podamos comenzar a la hora acordada." +
          "<br/>" +
          "<br/>" +
          "Saludos cordiales."+
        "<br/>" +
          "<br/>" +
          '<img src="cid:pieImagen" style="width:150px; height:150px;" alt="Logo" />'+
         // "<b><h2>GestaPet</h2></b>" +
          "<br/>" +
          element.sucursal.nombre +
          "<br/>" +
          element.sucursal.telefono +
          "<br/>" +
          element.sucursal.correoElectronico +
          "<br/>" +
          element.sucursal.direccion+
          "</body>";

// cron.schedule("*/10 * * * * *", async () => {
//   simulateRequest()
//     .then(() => {
//       console.log("Array de citas:", citas.length); // Usa el array de citas

//       citas.forEach((element) => {
//         var body =
//         "<body>"+
//           "<b>Estimado/a " +
//           element.cliente.nombre +
//           "</b>" +
//           "<br/>" +
//           "<br/>" +
//           "Espero que este mensaje le encuentre bien." +
//           "<br/>" +
//           "<br/>" +
//           "Le escribimos para recordarle su próxima cita en GestaPet, en la sucursal de " +
//           element.sucursal.nombre +
//           ". A continuación, le proporcionamos los detalles de la cita:<br/><br/>" +
//           "<ul>" +
//           "<li><b>Fecha:</b> " +
//           formateDate1(element.fecha) +
//           "</li>" +
//           "<li><b>Hora:</b> " +
//           formateTime(element.horaInicio + "") +
//           "</li>" +
//           "<li><b>Mascota:</b> " +
//           element.mascota.nombre +
//           "</li>" +
//           "</ul>" +
//           "Por favor, llegue con unos 15 minutos de antelación para completar cualquier documentación necesaria y para que podamos comenzar a la hora acordada." +
//           "<br/>" +
//           "<br/>" +
//           "Saludos cordiales."+
//         "<br/>" +
//           "<br/>" +
//           '<img src="cid:pieImagen" style="width:150px; height:150px;" alt="Logo" />'+
//          // "<b><h2>GestaPet</h2></b>" +
//           "<br/>" +
//           element.sucursal.nombre +
//           "<br/>" +
//           element.sucursal.telefono +
//           "<br/>" +
//           element.sucursal.correoElectronico +
//           "<br/>" +
//           element.sucursal.direccion+
//           "</body>";


//         var mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: element.cliente.correoElectronico,
//           subject:
//             "Recordatorio de su cita para " +
//             element.mascota.nombre +
//             " - " +
//             formateDate(element.fecha),
//           html: body,
//           attachments: [
//             {
//               filename: 'logo.jpg',
//               path: './assets/uploads/logo.jpg', // Ruta a la imagen en tu sistema
//               cid: 'pieImagen', // Identificador único para referenciar la imagen en el HTML
//             },
//           ],
//         };


       
        const info = transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

//         const info = transporter.sendMail(mailOptions, function (error, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("Email sent: " + info.response);
//           }
//         });


//         const url = nodemailer.getTestMessageUrl(info);
//         console.log(url);
//       });
//     })
//     .catch((error) => {
//       console.error("Error en simulateRequest:", error);
//     });
// });

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
const reporteRouter = require("./routes/reporteRoutes")

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
app.use("/reporte", reporteRouter)


app.use(
  "/images",
  express.static(path.join(path.resolve(), "/assets/uploads"))
);

// Servidor
app.listen(port, () => {
  console.log(chalk.blue(`http://localhost:${port}`));
  console.log(chalk.blue.bgRed("Presione CTRL-C para deternerlo\n"));
});
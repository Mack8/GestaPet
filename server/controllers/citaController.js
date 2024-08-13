const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const citas = await prisma.cita.findMany();
  response.json(citas);
};

module.exports.getCitas = async (req, res) => {
  var fechaInicio = new Date(req);
  fechaInicio.setHours(0, 0, 0, 0);
 // fechaInicio = formateDate(fechaInicio);
  console.log("🚀 ~ module.exports.getCitas= ~ fechaInicio:", fechaInicio);

  var fechaFin = new Date(req);
  fechaFin.setHours(23, 59, 59, 999);
  //fechaFin = formateDate(fechaFin);
  console.log("🚀 ~ module.exports.getCitas= ~ fechaFin:", fechaFin);

  try {
    const citas = await prisma.cita.findMany({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        estadoId:{
            not: 3,
        },
      },
      include: {
        estado: true,
        cliente: true,
        servicio: true,
        mascota: true,
        sucursal: true,
      },
    });
    res.json(citas); // Envía la respuesta JSON
  } catch (error) {
    console.error("Error al obtener citas:", error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

function formateDate(date) {
  var dia = date.getDate();
  var mes = date.getMonth() + 1;
  var anio = date.getFullYear();
  var hora = date.getHours(); // Obtiene la hora (0-23)
  var minutos = date.getMinutes(); // Obtiene los minutos (0-59)
  var segundos = date.getSeconds(); // Obtiene los segundos (0-59)

  return (
   anio+
    "-" +
    (mes < 10 ? "0" + mes : mes) +
    "-" +
    (dia < 10 ? "0" + dia : dia) +
    " " +
    (hora < 10 ? "0" + hora : hora) +
    ":" +
    (minutos < 10 ? "0" + minutos : minutos) +
    ":" +
    (segundos < 10 ? "0" + segundos : segundos)
  );
}

module.exports.getCitaById = async (request, response, next) => {
  let idCita = parseInt(request.params.id);
  const cita = await prisma.cita.findUnique({
    where: { id: idCita },
    include: {
      estado: true,
      cliente: true,
      servicio: true,
      mascota: true,
      sucursal: true,
    },
  });
  response.json(cita);
};

module.exports.getCitaByUsuario = async (request, response, next) => {
  try {
    let ususario = parseInt(request.params.usuario);
    console.log("🚀 ~ module.exports.getCitaByUsuario= ~ usuario:", ususario);

    const sucursal = await prisma.usuario.findFirst({
      where: { id: ususario },
    });

    console.log("🚀 ~ module.exports.getCitaByUsuario= ~ sucursal:", sucursal);

    if (!sucursal) {
      return response
        .status(404)
        .json({ error: "Sucursal no encontrada para el usuario dado" });
    }

    const cita = await prisma.cita.findMany({
      where: { sucursalId: sucursal.sucursalId },
      include: {
        estado: true,
        cliente: true,
        servicio: true,
        mascota: true,
        sucursal: true,
      },
    });

    response.json(cita);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error al obtener las citas" });
  }
};

module.exports.createCita = async (request, response, next) => {
  console.log("🚀 ~ module.exports.createCita= ~ request:", request)
  let body = request.body;
  const newCita = await prisma.cita.create({
    data: {
      fecha: new Date(body.startDate),
      horaInicio: new Date(body.startDate),
      horaFin: new Date(body.endDate),
      observaciones: body.observaciones,
      padecimientos:body.padecimientos,
      alergias:body.alergias,
      estado: {
        connect: { id: body.estadoId},
      },
      cliente: {
        connect: { id: body.clienteId },
      },
      servicio: {
        connect: { id: body.servicioId },
      },
      mascota: {
        connect: { id: body.mascotaId },
      },
      sucursal: {
        connect: { id: body.sucursalId },
      },
    },
  });
  response.json(newCita);
};

module.exports.updateCita = async (request, response, next) => {
  let body = request.body;
  let idCita = parseInt(request.params.id);
  const updateCita = await prisma.cita.update({
    where: {
      id: idCita,
    },
    data: {
      fecha: new Date(body.startDate),
      horaInicio: new Date(body.startDate),
      horaFin: new Date(body.endDate),
      observaciones: body.observaciones,
      padecimientos:body.padecimientos,
      alergias:body.alergias,
      estado: {
        connect: { id: body.estadoId },
      },
      cliente: {
        connect: { id: body.clienteId },
      },
      servicio: {
        connect: { id: body.servicioId },
      },
      mascota: {
        connect: { id: body.mascotaId },
      },
      sucursal: {
        connect: { id: body.sucursalId },
      },
    },
  });
  response.json(updateCita);
};

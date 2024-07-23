const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const horarios = await prisma.horario.findMany();
  response.json(horarios);
};

module.exports.getHorarioById = async (request, response, next) => {
  let idHorario = parseInt(request.params.id);
  const horario = await prisma.horario.findUnique({
    where: { id: idHorario },
    include: {
      sucursal: true,
    },
  });
  response.json(horario);
};

module.exports.getHorarioBySucursal = async (request, response, next) => {
  let idSucursal = parseInt(request.params.id);
  const horarios = await prisma.horario.findMany({
    where: { sucursalId: idSucursal },
    include: {
      sucursal: true,
    },
  });
  response.json(horarios);
};

module.exports.getHorarioBySucursalTipo = async (request, response, next) => {
  console.log("🚀 ~ module.exports.getHorarioBySucursal= ~ request:", request);
  let idSucursal = parseInt(request.params.id);
  let tipo = request.params.tipo;
  const horarios = await prisma.horario.findMany({
    where: { sucursalId: idSucursal, tipo: tipo },
    include: {
      sucursal: true,
    },
  });
  response.json(horarios);
};

module.exports.createHorario = async (request, response, next) => {
  let body = request.body;
  const newHorario = await prisma.horario.create({
    data: {
      sucursal: {
        connect: { id: body.idSucursal },
      },
      tipo: body.tipo,
      fechaInicio: body.finicio ? body.finicio : null,
      fechaFin: body.ffin ? body.ffin : null,
      horaInicio: body.hinicio ? body.hinicio: null,
      horaFin: body.hfin ? body.hfin : null,
      diasSemana: body.diasSemana? body.diasSemana: null,
      motivo: body.motivo,
    },
  });
  response.json(newHorario);
};

module.exports.update = async (request, response, next) => {
  let body = request.body;
  let idHorario = parseInt(request.params.id);
  const horario = await prisma.horario.findUnique({
    where: { id: idHorario },
    include: {
      sucursal: true,
    },
  });

  const updateHorario = await prisma.horario.update({
    where: {
      id: idHorario,
    },
    data: {
      sucursal: {
        connect: { id: body.idSucursal },
      },
      tipo: body.tipo,
      fechaInicio: body.finicio ? body.finicio : null,
      fechaFin: body.ffin ? body.ffin : null,
      horaInicio: body.hinicio ? body.hinicio: null,
      horaFin: body.hfin ? body.hfin : null,
      diasSemana: body.diasSemana? body.diasSemana: null,
      motivo: body.motivo,
    },
  });
  response.json(updateHorario);
};

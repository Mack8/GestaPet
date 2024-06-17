const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const citas=await prisma.cita.findMany()
    response.json(citas)
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
            sucursal: true
        }
    });
    response.json(cita);
};

module.exports.createCita = async (request, response, next) => {
    let body = request.body;
    const newCita = await prisma.cita.create({
        data: {
            fecha: new Date(body.fecha),
            horaInicio: new Date(body.horaInicio),
            horaFin: new Date(body.horaFin),
            estado: {
                connect: { id: body.estadoId }
            },
            cliente: {
                connect: { id: body.clienteId }
            },
            servicio: {
                connect: { id: body.servicioId }
            },
            mascota: {
                connect: { id: body.mascotaId }
            },
            sucursal: {
                connect: { id: body.sucursalId }
            }
        }
    });
    response.json(newCita);
};

module.exports.updateCita = async (request, response, next) => {
    let body = request.body;
    let idCita = parseInt(request.params.id);
    const updateCita = await prisma.cita.update({
        where: {
            id: idCita
        },
        data: {
            fecha: new Date(body.fecha),
            horaInicio: new Date(body.horaInicio),
            horaFin: new Date(body.horaFin),
            estado: {
                connect: { id: body.estadoId }
            },
            cliente: {
                connect: { id: body.clienteId }
            },
            servicio: {
                connect: { id: body.servicioId }
            },
            mascota: {
                connect: { id: body.mascotaId }
            },
            sucursal: {
                connect: { id: body.sucursalId }
            }
        }
    });
    response.json(updateCita);
};

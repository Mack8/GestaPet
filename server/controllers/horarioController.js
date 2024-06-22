const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const horarios= await prisma.horario.findMany()
    response.json(horarios)
}

module.exports.getHorarioById = async (request, response, next) => {
    let idHorario = parseInt(request.params.id);
    const horario = await prisma.horario.findUnique({
        where: { id: idHorario },
        include: {
            sucursal: true
        }
    });
    response.json(horario);
};

module.exports.createHorario = async (request, response, next) => {
    let body = request.body;
    const newHorario = await prisma.horario.create({
        data: {
            sucursal: {
                connect: { id: body.sucursalId }
            },
            tipo: body.tipo,
            fechaInicio: new Date(body.fechaInicio),
            fechaFin: body.fechaFin ? new Date(body.fechaFin) : null,
            horaInicio: body.horaInicio ? new Date(body.horaInicio) : null,
            horaFin: body.horaFin ? new Date(body.horaFin) : null,
            diasSemana: body.diasSemana,
            motivo: body.motivo
        }
    });
    response.json(newHorario);
};


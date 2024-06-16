const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const productos=await prisma.producto.findMany({
        orderBy:{
            fechaOrden: 'asc'
        }
    })
    response.json(ordenes)
};

module.exports.getMascotaById = async (request, response, next) => {
    let idMascota = parseInt(request.params.id);
    const mascota = await prisma.mascota.findUnique({
        where: { id: idMascota },
        include: {
            citas: true,
            propietario: true
        }
    });
    response.json(mascota);
};

module.exports.createMascota = async (request, response, next) => {
    let body = request.body;
    const newMascota = await prisma.mascota.create({
        data: {
            nombre: body.nombre,
            especie: body.especie,
            raza: body.raza,
            edad: body.edad,
            propietarioId: body.propietarioId
        }
    });
    response.json(newMascota);
};

module.exports.updateMascota = async (request, response, next) => {
    let body = request.body;
    let idMascota = parseInt(request.params.id);
    const updateMascota = await prisma.mascota.update({
        where: {
            id: idMascota
        },
        data: {
            nombre: body.nombre,
            especie: body.especie,
            raza: body.raza,
            edad: body.edad,
            propietarioId: body.propietarioId
        }
    });
    response.json(updateMascota);
};

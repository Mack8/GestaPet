const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const mascotas= await prisma.mascota.findMany()
    response.json(mascotas)
}

module.exports.getMascotaById = async (request, response, next) => {
    let idMascota = parseInt(request.params.id);
    const mascota = await prisma.mascota.findUnique({
        where: { id: idMascota },
    });
    response.json(mascota);
};

module.exports.create = async (request, response, next) => {
    let body = request.body;
    const newMascota = await prisma.mascota.create({
        data: {
            nombre: body.nombre,
            especie: body.especie,
            raza: body.raza,
            edad: body.edad,
            propietario: {
                connect: { id: body.propietarioId }
            }
        }
    });
    response.json(newMascota);
};

module.exports.update = async (request, response, next) => {
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
            propietario: {
                connect: { id: body.propietarioId }
            }
        }
    });
    response.json(updateMascota);
};

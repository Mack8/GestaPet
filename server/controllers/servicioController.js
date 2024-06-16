const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.getServicios = async (request, response, next) => {
    const servicios = await prisma.servicio.findMany({
        orderBy: {
            nombre: 'asc'
        }
    });
    response.json(servicios);
};

module.exports.getServicioById = async (request, response, next) => {
    let idServicio = parseInt(request.params.id);
    const servicio = await prisma.servicio.findUnique({
        where: { id: idServicio },
        include: {
            citas: true,
            detallesFactura: true,
            sucursal: true
        }
    });
    response.json(servicio);
};

module.exports.createServicio = async (request, response, next) => {
    let body = request.body;
    const newServicio = await prisma.servicio.create({
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            duracion: body.duracion,
            categoriaServicio: body.categoriaServicio,
            disponibilidad: body.disponibilidad,
            sucursalId: body.sucursalId
        }
    });
    response.json(newServicio);
};

module.exports.updateServicio = async (request, response, next) => {
    let body = request.body;
    let idServicio = parseInt(request.params.id);
    const updateServicio = await prisma.servicio.update({
        where: {
            id: idServicio
        },
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            duracion: body.duracion,
            categoriaServicio: body.categoriaServicio,
            disponibilidad: body.disponibilidad,
            sucursalId: body.sucursalId
        }
    });
    response.json(updateServicio);
};

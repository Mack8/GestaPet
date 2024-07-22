const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const sucursales= await prisma.sucursal.findMany()
    response.json(sucursales)
}

module.exports.getSucursalById = async (request, response, next) => {
    let idSucursal = parseInt(request.params.id);
    const sucursal = await prisma.sucursal.findUnique({
        where: { id: idSucursal },
        include:{
            usuarios:{
                select:{
                    id:true,
                    nombre:true
                }
            }
        }
    });
    response.json(sucursal);
};


module.exports.createSucursal = async (request, response, next) => {
    let body = request.body;
    const encargados = body.encargados; // Lista de IDs de encargados a asignar

    try {
        const newSucursal = await prisma.$transaction(async (prisma) => {
            const createdSucursal = await prisma.sucursal.create({
                data: {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    telefono: body.telefono,
                    direccion: body.direccion,
                    correoElectronico: body.correoElectronico
                }
            });

            if (encargados && encargados.length > 0) {
                await prisma.usuario.updateMany({
                    where: {
                        id: { in: encargados },
                        rol: 'ENCARGADO' // Aseguramos que solo los usuarios con rol ENCARGADO sean actualizados
                    },
                    data: {
                        sucursalId: createdSucursal.id
                    }
                });
            }

            return createdSucursal;
        });

        response.json(newSucursal);
    } catch (error) {
        next(error);
    }
};

module.exports.updateSucursal = async (request, response, next) => {
    let body = request.body;
    let idSucursal = parseInt(request.params.id);
    const updateSucursal = await prisma.sucursal.update({
        where: {
            id: idSucursal
        },
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            telefono: body.telefono,
            direccion: body.direccion,
            correoElectronico: body.correoElectronico
        }
    });
    response.json(updateSucursal);
};

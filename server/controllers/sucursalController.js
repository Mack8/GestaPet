const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const sucursales= await prisma.sucursal.findMany()
    response.json(sucursales)
}

module.exports.getSucursalById = async (request, response, next) => {
    let idSucursal = parseInt(request.params.id);
    const sucursal = await prisma.sucursal.findMany({
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


module.exports.getSucursalAndEncargados = async (request, response, next) => {
    let idSucursal = parseInt(request.params.id);
    try {
        // Obtener la sucursal con los usuarios asignados
        const sucursal = await prisma.sucursal.findUnique({
            where: { id: idSucursal },
            include: {
                usuarios: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        });

        // Obtener los encargados disponibles (sin sucursal asignada) con solo id y nombre
        const encargados = await prisma.usuario.findMany({
            where: {
                rol: 'ENCARGADO',
                OR: [
                    { sucursalId: null },
                    { sucursalId: idSucursal }
                ]
            }
        });

        // Combina los usuarios asignados y los encargados disponibles

        response.json({ sucursal, encargados });
    } catch (error) {
        next(error);
    }
};




module.exports.create= async (request, response, next) => {
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
                        rol: 'ENCARGADO' 
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

module.exports.update= async (request, response, next) => {
    let body = request.body;
    let idSucursal = parseInt(request.params.id);
    const encargados = body.encargados; 

    try {
        const updatedSucursal = await prisma.$transaction(async (prisma) => {
            // Actualizar la sucursal
            const sucursal = await prisma.sucursal.update({
                where: { id: idSucursal },
                data: {
                    nombre: body.nombre,
                    descripcion: body.descripcion,
                    telefono: body.telefono,
                    direccion: body.direccion,
                    correoElectronico: body.correoElectronico
                }
            });

            // Actualizar encargados
            if (encargados && encargados.length > 0) {
                await prisma.usuario.updateMany({
                    where: {
                        sucursalId: idSucursal,
                        rol: 'ENCARGADO'
                    },
                    data: {
                        sucursalId: null // Remover encargados actuales
                    }
                });

                await prisma.usuario.updateMany({
                    where: {
                        id: { in: encargados },
                        rol: 'ENCARGADO'
                    },
                    data: {
                        sucursalId: idSucursal // Asignar nuevos encargados
                    }
                });
            }

            return sucursal;
        });

        response.json(updatedSucursal);
    } catch (error) {
        next(error);
    }
};

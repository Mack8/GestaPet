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
        include: {
            servicios: true,
            citas: true,
            horarios: true,
            facturas: true
        }
    });
    response.json(sucursal);
};

module.exports.createSucursal = async (request, response, next) => {
    let body = request.body;
    const newSucursal = await prisma.sucursal.create({
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            telefono: body.telefono,
            direccion: body.direccion,
            correoElectronico: body.correoElectronico
        }
    });
    response.json(newSucursal);
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

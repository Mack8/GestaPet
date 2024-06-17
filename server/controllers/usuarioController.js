const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const usuarios= await prisma.usuario.findMany()
    response.json(usuarios)
}

module.exports.getUsuarioById = async (request, response, next) => {
    let idUsuario = parseInt(request.params.id);
    const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
        include: {
            mascotas: true,
            citas: true,
            facturas: true
        }
    });
    response.json(usuario);
};

module.exports.create = async (request, response, next) => {
    let body = request.body;
    const newUsuario = await prisma.usuario.create({
        data: {
            nombre: body.nombre,
            telefono: body.telefono,
            correoElectronico: body.correoElectronico,
            direccion: body.direccion,
            fechaNacimiento: new Date(body.fechaNacimiento),
            contrasena: body.contrasena,
            rol: body.rol
        }
    });
    response.json(newUsuario);
};

module.exports.updateUsuario = async (request, response, next) => {
    let body = request.body;
    let idUsuario = parseInt(request.params.id);
    const updateUsuario = await prisma.usuario.update({
        where: {
            id: idUsuario
        },
        data: {
            nombre: body.nombre,
            telefono: body.telefono,
            correoElectronico: body.correoElectronico,
            direccion: body.direccion,
            fechaNacimiento: new Date(body.fechaNacimiento),
            contrasena: body.contrasena,
            rol: body.rol
        }
    });
    response.json(updateUsuario);
};

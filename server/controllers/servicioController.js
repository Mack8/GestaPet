const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const servicios= await prisma.servicio.findMany()
    response.json(servicios)
}

module.exports.getServicioById = async (request, response, next) => {
    let idServicio = parseInt(request.params.id);
    const servicio = await prisma.servicio.findUnique({
        where: { id: idServicio },
    });
    response.json(servicio);
};

module.exports.create = async (request, response, next) => {
    try {
      let body = request.body;
      const newServicio = await prisma.servicio.create({
        data: {
          nombre: body.nombre,
          descripcion: body.descripcion,
          precio: parseFloat(body.precio),
          duracion: parseInt(body.duracion),
          categoriaServicio: body.categoriaServicio,
          disponibilidad: body.disponibilidad// Convertir a TINYINT(1)
        }
      });
      response.status(201).json(newServicio);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.update = async (request, response, next) => {
    try {
      let body = request.body;
      const updatedServicio = await prisma.servicio.update({
        where: { id: body.id },
        data: {
          nombre: body.nombre,
          descripcion: body.descripcion,
          precio: parseFloat(body.precio),
          duracion: body.duracion,
          categoriaServicio: body.categoriaServicio,
          disponibilidad: body.disponibilidad // Convertir a TINYINT(1)
        }
      });
      response.status(200).json(updatedServicio);
    } catch (error) {
      next(error);
    }
  };

const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const servicios= await prisma.servicio.findMany()
    response.json(generos)
}
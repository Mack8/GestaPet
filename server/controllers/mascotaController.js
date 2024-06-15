const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const mascotas= await prisma.mascota.findMany()
    response.json(generos)
}
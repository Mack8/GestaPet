const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const horarios= await prisma.horario.findMany()
    response.json(generos)
}
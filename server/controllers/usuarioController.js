const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const usuarios= await prisma.usuario.findMany()
    response.json(generos)
}
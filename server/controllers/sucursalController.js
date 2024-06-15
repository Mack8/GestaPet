const {PrismaClient}= require("@prisma/client")

const prisma=new PrismaClient() 

module.exports.get=async(request,response, next)=>{
    const sucursales= await prisma.sucursal.findMany()
    response.json(generos)
}
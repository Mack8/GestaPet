const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const estadoCitas=await prisma.estadoCita.findMany()
    response.json(estadoCitas)
}
const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const citas=await prisma.cita.findMany()
    response.json(citas)
}
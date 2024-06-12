const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const facturas=await prisma.factura.findMany()
    response.json(facturas)
}
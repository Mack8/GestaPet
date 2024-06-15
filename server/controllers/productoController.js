const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const productos=await prisma.producto.findMany({
        orderBy:{
            fechaOrden: 'asc'
        }
    })
    response.json(ordenes)
}
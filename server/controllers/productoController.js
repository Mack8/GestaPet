const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get=async(request,response, next)=>{
    const productos= await prisma.producto.findMany()
    response.json(productos)
}

module.exports.getById = async (request, response, next) => {
    try {
        let idProducto = parseInt(request.params.id);
        const producto = await prisma.producto.findFirst({
            where: { id: idProducto }
        });
        response.json(producto);
    } catch (error) {
        next(error);
    }
};

// Crear producto
module.exports.create = async (request, response, next) => {
    try {
        let body = request.body;
        const newProducto = await prisma.producto.create({
            data: {
                nombre: body.nombre,
                descripcion: body.descripcion,
                categoria: body.categoria,
                precio: parseFloat(body.precio),
                stock: parseInt(body.stock, 10),
                proveedor: body.proveedor
            }
        });
        response.json(newProducto);
    } catch (error) {
        next(error);
    }
};

// Actualizar producto
module.exports.update = async (request, response, next) => {
    try {
        let body = request.body;
        let idProducto = parseInt(request.params.id);
        const updateProducto = await prisma.producto.update({
            where: { id: idProducto },
            data: {
                nombre: body.nombre,
                descripcion: body.descripcion,
                categoria: body.categoria,
                precio: parseFloat(body.precio),
                stock:parseInt(body.stock, 10),
                proveedor: body.proveedor
            }
        });
        response.json(updateProducto);
    } catch (error) {
        next(error);
    }
};

// Eliminar producto
module.exports.delete = async (request, response, next) => {
    try {
        let idProducto = parseInt(request.params.id);
        await prisma.producto.delete({
            where: { id: idProducto }
        });
        response.json({ message: 'Producto eliminado' });
    } catch (error) {
        next(error);
    }
};
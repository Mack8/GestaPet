const {PrismaClient}= require("@prisma/client")

const prisma = new PrismaClient()

module.exports.get=async(request,response, next)=>{
    const facturas=await prisma.factura.findMany()
    response.json(facturas)
}

module.exports.getFacturaById = async (request, response, next) => {
    let idFactura = parseInt(request.params.id);
    const factura = await prisma.factura.findUnique({
        where: { id: idFactura },
        include: {
            cliente: true,
            sucursal: true,
            detalles: true
        }
    });
    response.json(factura);
};

module.exports.createFactura = async (request, response, next) => {
    let body = request.body;
    const newFactura = await prisma.factura.create({
        data: {
            fecha: new Date(body.fecha),
            cliente: {
                connect: { id: body.clienteId }
            },
            sucursal: {
                connect: { id: body.sucursalId }
            },
            subtotal: body.subtotal,
            impuestos: body.impuestos,
            total: body.total,
            detalles: {
                create: body.detalles.map(detalle => ({
                    productoId: detalle.productoId,
                    servicioId: detalle.servicioId,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    impuestoPorcentaje: detalle.impuestoPorcentaje,
                    montoImpuesto: detalle.montoImpuesto,
                    totalBruto: detalle.totalBruto,
                    totalNeto: detalle.totalNeto
                }))
            }
        }
    });
    response.json(newFactura);
};

module.exports.updateFactura = async (request, response, next) => {
    let body = request.body;
    let idFactura = parseInt(request.params.id);
    const updateFactura = await prisma.factura.update({
        where: {
            id: idFactura
        },
        data: {
            fecha: new Date(body.fecha),
            cliente: {
                connect: { id: body.clienteId }
            },
            sucursal: {
                connect: { id: body.sucursalId }
            },
            subtotal: body.subtotal,
            impuestos: body.impuestos,
            total: body.total,
            detalles: {
                deleteMany: { facturaId: idFactura },
                create: body.detalles.map(detalle => ({
                    productoId: detalle.productoId,
                    servicioId: detalle.servicioId,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    impuestoPorcentaje: detalle.impuestoPorcentaje,
                    montoImpuesto: detalle.montoImpuesto,
                    totalBruto: detalle.totalBruto,
                    totalNeto: detalle.totalNeto
                }))
            }
        }
    });
    response.json(updateFactura);
};

module.exports.getDetalleFacturas = async (request, response, next) => {
    const detalleFacturas = await prisma.detalleFactura.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    response.json(detalleFacturas);
};

module.exports.getDetalleFacturaById = async (request, response, next) => {
    let idDetalleFactura = parseInt(request.params.id);
    const detalleFactura = await prisma.detalleFactura.findUnique({
        where: { id: idDetalleFactura },
        include: {
            factura: true,
            producto: true,
            servicio: true
        }
    });
    response.json(detalleFactura);
};

module.exports.createDetalleFactura = async (request, response, next) => {
    let body = request.body;
    const newDetalleFactura = await prisma.detalleFactura.create({
        data: {
            factura: {
                connect: { id: body.facturaId }
            },
            producto: {
                connect: { id: body.productoId }
            },
            servicio: {
                connect: { id: body.servicioId }
            },
            cantidad: body.cantidad,
            precio: body.precio,
            impuestoPorcentaje: body.impuestoPorcentaje,
            montoImpuesto: body.montoImpuesto,
            totalBruto: body.totalBruto,
            totalNeto: body.totalNeto
        }
    });
    response.json(newDetalleFactura);
};

module.exports.updateDetalleFactura = async (request, response, next) => {
    let body = request.body;
    let idDetalleFactura = parseInt(request.params.id);
    const updateDetalleFactura = await prisma.detalleFactura.update({
        where: {
            id: idDetalleFactura
        },
        data: {
            factura: {
                connect: { id: body.facturaId }
            },
            producto: {
                connect: { id: body.productoId }
            },
            servicio: {
                connect: { id: body.servicioId }
            },
            cantidad: body.cantidad,
            precio: body.precio,
            impuestoPorcentaje: body.impuestoPorcentaje,
            montoImpuesto: body.montoImpuesto,
            totalBruto: body.totalBruto,
            totalNeto: body.totalNeto
        }
    });
    response.json(updateDetalleFactura);
};

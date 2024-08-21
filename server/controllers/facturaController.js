const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  try {
    const facturas = await prisma.factura.findMany({
      include: {
        cliente: true,
        sucursal: true,
        detalles: {
          include: {
            producto: true,
            servicio: true
          }
        }
      }
    });
    response.json(facturas);
  } catch (error) {
    next(error);
  }
};



module.exports.getProformas = async (request, response, next) => {
  try {
    const proformas = await prisma.factura.findMany({
      where: {
        estado: "PROFORMA" // Filtra por el estado "PROFORMA"
      },
      include: {
        cliente: true,
        sucursal: true,
        detalles: {
          include: {
            producto: true,
            servicio: true
          }
        }
      }
    });
    response.json(proformas);
  } catch (error) {
    next(error);
  }
};



module.exports.getFacturaById = async (request, response, next) => {
  try {
    let idFactura = parseInt(request.params.id);
    const factura = await prisma.factura.findUnique({
      where: { id: idFactura },
      include: {
        cliente: true,
        sucursal: true,
        detalles: {
          include: {
            producto: true,
            servicio: true
          }
        }
      }
    });
    response.json(factura);
  } catch (error) {
    next(error);
  }
};

module.exports.getFacturasByCliente = async (request, response, next) => {
  try {
    let idCliente = parseInt(request.params.id);
    const factura = await prisma.factura.findMany({
      where: { clienteId: idCliente },
      include: {
        cliente: true,
        sucursal: true,
        detalles: {
          include: {
            producto: true,
            servicio: true
          }
        }
      }
    });
    response.json(factura);
  } catch (error) {
    next(error);
  }
};


module.exports.createFactura = async (request, response, next) => {
    let body = request.body;
    console.log("🚀 ~ module.exports.createFactura ~ body:", body.detalles);

    try {
        const newFactura = await prisma.factura.create({
            data: {
                fecha: new Date(),
                cliente: {
                    connect: { id: body.clienteId }
                },
                sucursal: {
                    connect: { id: body.sucursalId }
                },
                estado:body.estado,
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
    } catch (error) {
        console.error('Error al crear factura:', error);
        response.status(500).json({ error: 'Error al crear factura' });
    }

  }
  
module.exports.create = async (request, response, next) => {
  try {
    let infoFactura = request.body;
    const newFactura = await prisma.factura.create({
      data: {
        fecha: infoFactura.fecha,
        clienteId: infoFactura.clienteId,
        sucursalId: infoFactura.sucursalId,
        subtotal: parseFloat(infoFactura.subtotal),
        impuestos: parseFloat(infoFactura.impuestos),
        total: parseFloat(infoFactura.total),
        estado: "FACTURADA",
        detalles: {
          createMany: {
            data: infoFactura.detalles.map(detalle => ({
              productoId: detalle.productoId,
              servicioId: detalle.servicioId,
              cantidad: detalle.cantidad,
              precio: parseFloat(detalle.precio),
              impuestoPorcentaje: detalle.impuestoPorcentaje,
              montoImpuesto: parseFloat(detalle.montoImpuesto),
              totalBruto: parseFloat(detalle.totalBruto),
              totalNeto: parseFloat(detalle.totalNeto)
            }))
          }
        }
      }
    });
    response.json(newFactura);
  } catch (error) {
    next(error);
  }

};


module.exports.updateFactura = async (request, response, next) => {
    try {
      let body = request.body;
      let idFactura = parseInt(request.params.id);
  
      // Actualizar la factura y sus detalles
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
          estado: "FACTURADA",
          detalles: {
            // Primero eliminar todos los detalles existentes
            deleteMany: {},
  
            // Luego agregar los nuevos detalles
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
    } catch (error) {
      next(error);
    }
  };
  
module.exports.getDetalleFacturas = async (request, response, next) => {
  try {
    const detalleFacturas = await prisma.detalleFactura.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    response.json(detalleFacturas);
  } catch (error) {
    next(error);
  }
};

module.exports.getDetalleFacturaById = async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports.createDetalleFactura = async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports.updateDetalleFactura = async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};




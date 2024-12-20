const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

module.exports.getCitasPorSucursalHoy = async (request, response, next) => {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT s.nombre AS sucursal, COUNT(c.id) AS cantidad_citas
                  FROM Cita c
                  JOIN Sucursal s ON c.sucursalId = s.id
                  WHERE DATE(c.fecha) = CURDATE()
                  GROUP BY s.nombre;`
    );
    response.json(result);
  };
  

  module.exports.getTopServiciosVendidos = async (request, response, next) => {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT s.nombre AS servicio, SUM(df.cantidad) AS total_vendido
                  FROM DetalleFactura df
                  JOIN Servicio s ON df.servicioId = s.id
                  GROUP BY s.nombre
                  ORDER BY total_vendido DESC
                  LIMIT 3;`
    );
    console.log(result);  // Verifica los datos en el servidor
    response.json(result);
  };
  
  
  module.exports.getTopProductosVendidos = async (request, response, next) => {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT p.nombre AS producto, SUM(df.cantidad) AS total_vendido
                  FROM DetalleFactura df
                  JOIN Producto p ON df.productoId = p.id
                  GROUP BY p.nombre
                  ORDER BY total_vendido DESC
                  LIMIT 3;`
    );
    response.json(result);
  };
 
  
  module.exports.getCitasPorEstadoSucursal = async (request, response, next) => {
    const { userId } = request.params; // Obtén el userId de los parámetros de la ruta
  
    if (!userId) {
      return response.status(400).json({ message: "ID de usuario no proporcionado" });
    }
  
    // Ahora obtén el `sucursalId` asociado al usuario encargado
    const encargado = await prisma.usuario.findUnique({
      where: { id: parseInt(userId) },
      select: { sucursalId: true },
    });
  
    if (!encargado || !encargado.sucursalId) {
      return response.status(404).json({ message: "Sucursal no encontrada para el usuario encargado." });
    }
  
    // Obtener la cantidad de citas por estado para la sucursal del encargado
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT e.nombreEstado AS estado, COUNT(c.id) AS cantidad
                  FROM Cita c
                  JOIN EstadoCita e ON c.estadoId = e.id
                  WHERE c.sucursalId = ${encargado.sucursalId}
                  GROUP BY e.nombreEstado;`
    );
  
    response.json(result);
  };
  






  // module.exports.getCitasPorEstadoSucursal = async (request, response, next) => {
  //   const { user } = request;
  
  //   if (!user || !user.userId) {
  //     return response.status(400).json({ message: "Usuario no autenticado o ID de usuario no disponible" });
  //   }
  
  //   const { userId } = user;
  
  //   // Ahora obtén el `sucursalId` asociado al usuario encargado
  //   const encargado = await prisma.usuario.findUnique({
  //     where: { id: userId },
  //     select: { sucursalId: true },
  //   });
  
  //   if (!encargado || !encargado.sucursalId) {
  //     return response.status(404).json({ message: "Sucursal no encontrada para el usuario encargado." });
  //   }
  
  //   // Obtener la cantidad de citas por estado para la sucursal del encargado
  //   const result = await prisma.$queryRaw(
  //     Prisma.sql`SELECT e.nombreEstado AS estado, COUNT(c.id) AS cantidad
  //                 FROM Cita c
  //                 JOIN EstadoCita e ON c.estadoId = e.id
  //                 WHERE c.sucursalId = ${encargado.sucursalId}
  //                 GROUP BY e.nombreEstado;`
  //   );
  
  //   response.json(result);
  // };
  
  
  
  
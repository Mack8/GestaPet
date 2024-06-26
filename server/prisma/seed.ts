import { EstadoFactura, PrismaClient, Rol } from "@prisma/client";
import { productos } from "./seeds/productos";
import { servicios } from "./seeds/servicios";
import { sucursales } from "./seeds/suscursales";
import { estados } from "./seeds/estados";

const prisma = new PrismaClient();
const main = async () => {
  try {
    //Generos - no tiene relaciones
    await prisma.producto.createMany({
      data: productos,
    });

    await prisma.servicio.createMany({
      data: servicios,
    });

    await prisma.sucursal.createMany({
      data: sucursales,
    });

    await prisma.estadoCita.createMany({
      data: estados,
    });

    //#region  ---- USUARIOS -------

    //1
    await prisma.usuario.create({
      data: {
        nombre: "usuarioAdmin1",
        telefono: "88888888",
        correoElectronico: "usuario-admin1@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("2000-02-25"),
        contrasena: "1234560",
        rol: Rol.ADMINISTRADOR,
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //2
    await prisma.usuario.create({
      data: {
        nombre: "usuarioEncaragdo1",
        telefono: "88888889",
        correoElectronico: "usuario-encargado1@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1988-12-25"),
        contrasena: "1234560",
        rol: Rol.ENCARGADO,
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //3
    await prisma.usuario.create({
      data: {
        nombre: "usuarioEncaragdo2",
        telefono: "88888887",
        correoElectronico: "usuario-encargado2@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1997-02-27"),
        contrasena: "1234560",
        rol: Rol.ENCARGADO,
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //4
    await prisma.usuario.create({
      data: {
        nombre: "usuarioEncaragdo3",
        telefono: "88888587",
        correoElectronico: "usuario-encargado3@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1987-05-18"),
        contrasena: "1234560",
        rol: Rol.ENCARGADO,
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //5
    await prisma.usuario.create({
      data: {
        nombre: "usuarioEncaragdo4",
        telefono: "88888687",
        correoElectronico: "usuario-encargado4@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1977-11-20"),
        contrasena: "1234560",
        rol: Rol.ENCARGADO,
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //6
    await prisma.usuario.create({
      data: {
        nombre: "Juan Castro",
        telefono: "88888886",
        correoElectronico: "juancastro@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1989-03-17"),
        contrasena: "1234560",
        rol: Rol.CLIENTE,
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //7
    await prisma.usuario.create({
      data: {
        nombre: "María Flores",
        telefono: "88888885",
        correoElectronico: "mariaflores@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1996-12-27"),
        contrasena: "1234560",
        rol: Rol.CLIENTE,
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //8
    await prisma.usuario.create({
      data: {
        nombre: "Pedro Sandoval",
        telefono: "88888875",
        correoElectronico: "pedrosandoval@prueba.com",
        direccion: "Heredia",
        fechaNacimiento: new Date("1993-07-17"),
        contrasena: "1234560",
        rol: Rol.CLIENTE,
        sucursal: {
          connect: { id: 3 },
        },
      },
    
    });

    //9
    await prisma.usuario.create({
      data: {
        nombre: "Silvia Vargas",
        telefono: "88888895",
        correoElectronico: "silviavargas@prueba.com",
        direccion: "Alajuela",
        fechaNacimiento: new Date("1998-03-13"),
        contrasena: "1234560",
        rol: Rol.CLIENTE,
        sucursal: {
          connect: { id: 4 },
        },
      },
    });

    //#endregion

    //#region ------- MASCOTAS -------

    //1
    await prisma.mascota.create({
      data: {
        nombre: "Doki",
        especie: "Perro",
        raza: "Mestizo",
        edad: 12,
        propietario: {
          connect: { id: 6 },
        },
      },
    });

    //2
    await prisma.mascota.create({
      data: {
        nombre: "Sam",
        especie: "Perro",
        raza: "Chihuahua",
        edad: 6,
        propietario: {
          connect: { id: 7 },
        },
      },
    });

    //3
    await prisma.mascota.create({
      data: {
        nombre: "Oggy",
        especie: "Gato",
        raza: "Siames",
        edad: 3,
        propietario: {
          connect: { id: 7 },
        },
      },
    });

    //4
    await prisma.mascota.create({
      data: {
        nombre: "Rogelio",
        especie: "Gato",
        raza: "Mestizo",
        edad: 1,
        propietario: {
          connect: { id: 8 },
        },
      },
    });

    //5
    await prisma.mascota.create({
      data: {
        nombre: "Panchito",
        especie: "Perico",
        edad: 2,
        propietario: {
          connect: { id: 9 },
        },
      },
    });
    //#endregion

    //#region ------- CITAS -----

    //1
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 1 },
        },
        cliente: {
          connect: { id: 6 },
        },
        servicio: {
          connect: { id: 5 },
        },
        mascota: {
          connect: { id: 1 },
        },
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //2
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 1 },
        },
        cliente: {
          connect: { id: 6 },
        },
        servicio: {
          connect: { id: 8 },
        },
        mascota: {
          connect: { id: 1 },
        },
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //3
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 1 },
        },
        cliente: {
          connect: { id: 6 },
        },
        servicio: {
          connect: { id: 9 },
        },
        mascota: {
          connect: { id: 1 },
        },
        sucursal: {
          connect: { id: 1 },
        },
      },
    });

    //4
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 1 },
        },
        cliente: {
          connect: { id: 7 },
        },
        servicio: {
          connect: { id: 9 },
        },
        mascota: {
          connect: { id: 3 },
        },
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //5
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 2 },
        },
        cliente: {
          connect: { id: 7 },
        },
        servicio: {
          connect: { id: 3},
        },
        mascota: {
          connect: { id: 2 },
        },
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //6
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 3 },
        },
        cliente: {
          connect: { id: 7 },
        },
        servicio: {
          connect: { id: 9 },
        },
        mascota: {
          connect: { id: 3 },
        },
        sucursal: {
          connect: { id: 2 },
        },
      },
    });

    //7
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 1 },
        },
        cliente: {
          connect: { id: 8 },
        },
        servicio: {
          connect: { id: 10 },
        },
        mascota: {
          connect: { id: 4},
        },
        sucursal: {
          connect: { id: 3 },
        },
      },
    });

    //8
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 3 },
        },
        cliente: {
          connect: { id: 8 },
        },
        servicio: {
          connect: { id: 4 },
        },
        mascota: {
          connect: { id: 4 },
        },
        sucursal: {
          connect: { id: 3 },
        },
      },
    });

    //9
    await prisma.cita.create({
      data: {
        fecha: new Date(),
        horaInicio: new Date(),
        horaFin: new Date(),
        estado: {
          connect: { id: 2 },
        },
        cliente: {
          connect: { id: 8 },
        },
        servicio: {
          connect: { id: 5 },
        },
        mascota: {
          connect: { id: 4 },
        },
        sucursal: {
          connect: { id: 3 },
        },
      },
    });

    //#endregion

    //#region -----  FACTURAS -----
    //#region ------ ENCABEZADOS-----
    await prisma.factura.create({
      data: {
        fecha: new Date(),
        cliente: {
          connect: { id: 6 },
        },
        sucursal: {
          connect: { id: 1 },
        },
        subtotal: 79.98,
        impuestos: 10.40,
        total: 90.38,
        estado: EstadoFactura.PROFORMA,
      },
    });

    await prisma.factura.create({
      data: {
        fecha: new Date(),
        cliente: {
          connect: { id: 7 },
        },
        sucursal: {
          connect: { id: 1 },
        },
        subtotal: 37.99,
        impuestos: 4.94,
        total: 42.93,
        estado: EstadoFactura.FACTURADA,
      },
    });

    await prisma.factura.create({
      data: {
        fecha: new Date(),
        cliente: {
          connect: { id: 8 },
        },
        sucursal: {
          connect: { id: 1 },
        },
        subtotal: 64.99,
        impuestos: 8.45,
        total: 73.54,
        estado: EstadoFactura.PROFORMA,
      },
    });

    await prisma.factura.create({
      data: {
        fecha: new Date(),
        cliente: {
          connect: { id: 4 },
        },
        sucursal: {
          connect: { id: 1 },
        },
        subtotal: 150,
        impuestos: 19.5,
        total: 169.5,
        estado: EstadoFactura.FACTURADA,
      },
    });
    //#endregion

    //#region  ----- DETALLES ------
    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 1 },
        },
        producto: {
          connect: { id: 1 },
        },
        cantidad: 1,
        precio: 49.99,
        impuestoPorcentaje: 13,
        montoImpuesto: 6.50,
        totalBruto: 56.49,
        totalNeto: 49.99,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 1 },
        },
        producto: {
          connect: { id: 6 },
        },
        cantidad: 1,
        precio: 29.99,
        impuestoPorcentaje: 13,
        montoImpuesto: 3.90,
        totalBruto: 33.89,
        totalNeto: 29.99,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 2 },
        },
        servicio: {
          connect: { id: 1 },
        },
        cantidad: 1,
        precio: 25,
        impuestoPorcentaje: 13,
        montoImpuesto:3.25,
        totalBruto: 25,
        totalNeto: 28.25,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 2 },
        },
        producto: {
          connect: { id: 2 },
        },
        cantidad: 1,
        precio: 12.99,
        impuestoPorcentaje: 13,
        montoImpuesto: 1.69,
        totalBruto: 12.99,
        totalNeto: 14.68,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 3 },
        },
        producto: {
          connect: { id: 6 },
        },
        cantidad: 1,
        precio: 29.99,
        impuestoPorcentaje: 13,
        montoImpuesto: 3.90,
        totalBruto: 33.89,
        totalNeto: 29.99,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 3 },
        },
        servicio: {
          connect: { id: 2 },
        },
        cantidad: 1,
        precio: 15,
        impuestoPorcentaje: 13,
        montoImpuesto: 1.95,
        totalBruto: 16.95,
        totalNeto: 15,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 3 },
        },
        servicio: {
          connect: { id: 3 },
        },
        cantidad: 1,
        precio: 20,
        impuestoPorcentaje: 13,
        montoImpuesto: 2.6,
        totalBruto: 22.6,
        totalNeto: 20,
      },
    });

    await prisma.detalleFactura.create({
      data: {
        factura: {
          connect: { id: 4 },
        },
        servicio: {
          connect: { id: 5 },
        },
        cantidad: 1,
        precio: 150,
        impuestoPorcentaje: 13,
        montoImpuesto: 19.5,
        totalBruto: 169.5,
        totalNeto: 150,
      },
    });

    //#endregion
    //#endregion
  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn("Error al ejecutar el seeder:\n", err);
});

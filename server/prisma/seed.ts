import { PrismaClient } from '@prisma/client';
import { productos } from './seeds/productos';
import { servicios } from './seeds/servicios';

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


  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});

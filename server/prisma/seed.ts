import { PrismaClient } from '@prisma/client';
import { productos } from './seeds/productos';

const prisma = new PrismaClient();
const main = async () => {
  try {
    //Generos - no tiene relaciones
    await prisma.producto.createMany({
      data: productos,
    });
    //Usuarios - no tiene relaciones


  } catch (error) {
    throw error;
  }
};
main().catch((err) => {
  console.warn('Error al ejecutar el seeder:\n', err);
});

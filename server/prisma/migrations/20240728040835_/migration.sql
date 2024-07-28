-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `correoElectronico` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `rol` ENUM('CLIENTE', 'ENCARGADO', 'ADMINISTRADOR') NOT NULL DEFAULT 'CLIENTE',
    `sucursalId` INTEGER NULL,

    UNIQUE INDEX `Usuario_telefono_key`(`telefono`),
    UNIQUE INDEX `Usuario_correoElectronico_key`(`correoElectronico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `correoElectronico` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `duracion` INTEGER NOT NULL,
    `categoriaServicio` VARCHAR(191) NOT NULL,
    `disponibilidad` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mascota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,
    `raza` VARCHAR(191) NULL,
    `edad` INTEGER NOT NULL,
    `propietarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoCita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreEstado` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,
    `estadoId` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `padecimientos` VARCHAR(191) NULL,
    `alergias` VARCHAR(191) NULL,
    `clienteId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `mascotaId` INTEGER NOT NULL,
    `sucursalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sucursalId` INTEGER NOT NULL,
    `tipo` ENUM('SERVICIO', 'BLOQUEO') NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NULL,
    `horaInicio` DATETIME(3) NULL,
    `horaFin` DATETIME(3) NULL,
    `diasSemana` VARCHAR(191) NULL,
    `motivo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `imagen` VARCHAR(191) NOT NULL DEFAULT 'image-not-found.jpg',
    `stock` INTEGER NOT NULL,
    `proveedor` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `sucursalId` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `impuestos` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `estado` ENUM('PROFORMA', 'FACTURADA') NOT NULL DEFAULT 'PROFORMA',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleFactura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facturaId` INTEGER NOT NULL,
    `productoId` INTEGER NULL,
    `servicioId` INTEGER NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `impuestoPorcentaje` DOUBLE NOT NULL,
    `montoImpuesto` DOUBLE NOT NULL,
    `totalBruto` DOUBLE NOT NULL,
    `totalNeto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_propietarioId_fkey` FOREIGN KEY (`propietarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `EstadoCita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_mascotaId_fkey` FOREIGN KEY (`mascotaId`) REFERENCES `Mascota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

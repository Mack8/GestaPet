//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const reporteController = require("../controllers/reporteController");

//Definición de rutas para generos
router.get("/citas-dia/", reporteController.getCitasPorSucursalHoy);

router.get("/top3-productos/", reporteController.getTopProductosVendidos);
router.get("/top3-servicios/", reporteController.getVentaProductoMes);

module.exports = router;
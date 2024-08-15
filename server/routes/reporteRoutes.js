const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/reporte/citas-por-sucursal-hoy', reporteController.getCitasPorSucursalHoy);
router.get('/reporte/top-servicios-vendidos', reporteController.getTopServiciosVendidos);
router.get('/reporte/top-productos-vendidos', reporteController.getTopProductosVendidos);
router.get('/reporte/citas-por-estado-sucursal/:userId', reporteController.getCitasPorEstadoSucursal);

module.exports = router;

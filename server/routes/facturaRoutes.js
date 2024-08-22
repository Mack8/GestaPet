const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

//Rutas


router.get('/proformas', facturaController.getProformas);
router.get('/',facturaController.get)
router.post('/proforma', facturaController.createFactura);

router.get('/', facturaController.get);
router.get('/cliente/:id', facturaController.getFacturasByCliente);
router.get('/:id', facturaController.getFacturaById);
router.post('/', facturaController.create);
router.put('/:id', facturaController.updateFactura);


module.exports = router;

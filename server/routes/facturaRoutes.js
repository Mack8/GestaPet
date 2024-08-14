const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');


//Controlador

const facturaController= require("../controllers/facturaController")

//Rutas

//locahost:3000/videojuego/
router.get('/',facturaController.get)
router.get('/:id',facturaController.getFacturaById)
router.post('/', facturaController.createFactura);
// Rutas
router.get('/', facturaController.get);
router.get('/:id', facturaController.getFacturaById);
router.post('/', facturaController.create);
router.put('/:id', facturaController.updateFactura);


module.exports = router;

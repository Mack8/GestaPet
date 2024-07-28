const express=require("express")

const router = express.Router();

//Controlador

const facturaController= require("../controllers/facturaController")

//Rutas

//locahost:3000/videojuego/
router.get('/',facturaController.get)
router.get('/:id',facturaController.getFacturaById)

module.exports=router
const express=require("express")

const router = express.Router();

//Controlador

const citaController= require("../controllers/citaController")

//Rutas

//router.get('/',citaController.get);

router.get('/:usuario',citaController.getCitaByUsuario);

module.exports=router
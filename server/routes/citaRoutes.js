const express=require("express")

const router = express.Router();

//Controlador

const citaController= require("../controllers/citaController")

//Rutas

router.get("/",citaController.get)

module.exports=router
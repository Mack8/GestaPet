const express=require("express")

const router = express.Router();

//Controlador

const facturaController= require("../controllers/facturaController")

//Rutas

router.get("/",facturaController.get)

module.exports=router
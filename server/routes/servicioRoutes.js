const express=require("express")
const router=express.Router();

//Controlador
const servicioController=require("../controllers/servicioController")

//Rutas
router.get("/",servicioController.get)

module.exports=router
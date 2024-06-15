const express=require("express")
const router=express.Router();

//Controlador
const horarioController=require("../controllers/horarioController")

//Rutas
router.get("/",horarioController.get)

module.exports=router
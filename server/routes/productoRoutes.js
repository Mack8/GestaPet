const express=require("express")
const router=express.Router();

//Controlador
const productoController=require("../controllers/productoController")

//Rutas
router.get("/",productoController.get)

module.exports=router
const express=require("express")
const router=express.Router();

//Controlador
const sucursalController=require("../controllers/sucursalController")

//Rutas
router.get("/",sucursalController.get)

module.exports=router
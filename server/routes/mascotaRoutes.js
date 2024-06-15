const express=require("express")
const router=express.Router();

//Controlador
const mascotaController=require("../controllers/mascotaController")

//Rutas
router.get("/",mascotaController.get)

module.exports=router
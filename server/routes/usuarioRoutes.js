const express=require("express")
const router=express.Router();

//Controlador
const usuarioController=require("../controllers/usuarioController")

//Rutas
router.get("/",usuarioController.get)

module.exports=router
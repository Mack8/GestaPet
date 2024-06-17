const express=require("express")
const router=express.Router();

//Controlador
const usuarioController=require("../controllers/usuarioController")

//Rutas
router.get("/",usuarioController.get)

router.post('/',usuarioController.create)

module.exports=router
const express=require("express")
const router=express.Router();

//Controlador
const sucursalController=require("../controllers/sucursalController")

//Rutas
router.get("/",sucursalController.get)

router.get('/:id', sucursalController.getSucursalById); 

module.exports=router
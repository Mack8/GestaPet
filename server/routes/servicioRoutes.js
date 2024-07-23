const express=require("express")
const router=express.Router();

//Controlador
const servicioController=require("../controllers/servicioController")

//Rutas
router.get("/",servicioController.get)

router.get("/:id",servicioController.getServicioById)

router.post('/',servicioController.create)

router.put('/:id', servicioController.update)

module.exports=router
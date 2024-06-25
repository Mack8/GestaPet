const express=require("express")
const router=express.Router();

//Controlador
const productoController=require("../controllers/productoController")

//Rutas
router.get("/",productoController.get)

router.get('/:id',productoController.getById)

router.post('/',productoController.create)

router.put('/:id', productoController.update)

module.exports=router
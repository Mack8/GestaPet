const express=require("express")
const router=express.Router();

//Controlador
const mascotaController=require("../controllers/mascotaController")

//Rutas
router.get("/",mascotaController.get)

router.get('/:id',mascotaController.getMascotaById)

router.post('/',mascotaController.create)

router.put('/:id', mascotaController.update)


module.exports=router
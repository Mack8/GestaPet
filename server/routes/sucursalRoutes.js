const express=require("express")
const router=express.Router();

//Controlador
const sucursalController=require("../controllers/sucursalController")

//Rutas
router.get("/",sucursalController.get)

router.get("/sucursal/:id",sucursalController.getSucursalByUsuarioId)

router.get('/:id', sucursalController.getSucursalAndEncargados); 

router.post('/', sucursalController.create); // Crear un nuevo usuario

router.put('/:id', sucursalController.update);

module.exports=router
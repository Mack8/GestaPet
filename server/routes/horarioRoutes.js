const express=require("express")
const router=express.Router();

//Controlador
const horarioController=require("../controllers/horarioController")

//Rutas
router.get("/",horarioController.get)
router.get('/:id',horarioController.getHorarioById)
router.get('/sucursal/:id',horarioController.getHorarioBySucursal)
router.get('/sucursalTipo/:id/:tipo',horarioController.getHorarioBySucursalTipo)

router.post('/',horarioController.createHorario)
router.put('/:id', horarioController.update)

module.exports=router
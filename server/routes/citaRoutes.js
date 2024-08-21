const express=require("express")

const router = express.Router();


const citaController= require("../controllers/citaController")


router.get('/:usuario',citaController.getCitaByUsuario);
router.get('/sucursal/:id',citaController.getCitaBySucursal);
router.get('/cita/:id',citaController.getCitaById);
router.get('/cliente/:cliente/:usuario',citaController.getCitaByCliente);
router.get('/fecha/:fecha/:usuario',citaController.getCitaByFecha);

router.post('/',citaController.createCita);
router.put('/:id', citaController.updateCita)

module.exports=router
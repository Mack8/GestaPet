const express=require("express")

const router = express.Router();


const citaController= require("../controllers/citaController")


router.get('/:usuario',citaController.getCitaByUsuario);

router.get('/cita/:id',citaController.getCitaById);

router.post('/',citaController.createCita);
router.put('/:id', citaController.updateCita)

module.exports=router
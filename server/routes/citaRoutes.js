const express=require("express")

const router = express.Router();


const citaController= require("../controllers/citaController")


router.get('/:usuario',citaController.getCitaByUsuario);

router.get('/cita/:id',citaController.getCitaById);

module.exports=router
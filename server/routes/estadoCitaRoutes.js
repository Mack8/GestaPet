const express=require("express")

const router = express.Router();

//Controlador

const estadoCitaController= require("../controllers/estadoCitaController")

//Rutas

router.get("/",estadoCitaController.get)

module.exports=router
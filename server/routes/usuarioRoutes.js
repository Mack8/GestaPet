// routes/usuarioRoutes.js

const express = require("express");
const router = express.Router();

// Controlador
const usuarioController = require("../controllers/usuarioController");

// Rutas
router.get('/sucursal/:sucursalId', usuarioController.getEncargadosDisponibles); // Encargados de una sucursal específica
router.get('/encargados/disponibles', usuarioController.getUsuariosEncargadosDisponibles); // Encargados sin sucursal asignada
router.get('/:id', usuarioController.getUsuarioById); // Obtener usuario por ID
router.get('/', usuarioController.get); // Obtener todos los usuarios
router.post('/', usuarioController.create); // Crear un nuevo usuario

module.exports = router;

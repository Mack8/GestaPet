const express = require("express");
const router = express.Router();

// Controlador
const usuarioController = require("../controllers/usuarioController");

// Rutas
router.get('/sucursal/:sucursalId', usuarioController.getEncargadosDisponibles); // Encargados de una sucursal específica
router.get('/encargados/', usuarioController.getUsuariosEncargadosDisponibles); // Encargados sin sucursal asignada
router.get('/clientes/', usuarioController.getClientes); // Obtener clientes
router.get('/factura/', usuarioController.getUsuarios); // Obtener usuarios para factura

router.get('/:id', usuarioController.getUsuarioById); // Obtener usuario por ID

router.get('/', usuarioController.get); // Obtener todos los usuarios
router.post('/registrar', usuarioController.create); // Crear un nuevo usuario
router.post("/login", usuarioController.login); // Inicio de sesión

module.exports = router;

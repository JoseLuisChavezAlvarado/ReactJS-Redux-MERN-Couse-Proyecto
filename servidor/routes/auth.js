//RUTAS PARA CREAR USUARIOS
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//CREA UN USUARIO
//api/auth
router.post('/', authController.authenticate)

router.get('/', auth, authController.usuarioAutenticado)


module.exports = router;

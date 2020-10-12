//RUTAS PARA CREAR USUARIOS
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { check } = require('express-validator');

//CREA UN USUARIO
//api/auth
router.post('/', [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 })
], authController.authenticate)

module.exports = router;

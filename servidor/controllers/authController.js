const Usuario = require('../models/Usuario');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authenticate = async (req, resp) => {

    const { email, password } = req.body;

    try {
        //REVISAR QUE SEA UN USUARIO REGISTRADO
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return resp.status(400).json({ msg: 'El usuario no existe' });
        }

        //REVISAR EL PASSWORD
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if (!passCorrecto) {
            return resp.status(400).json({ msg: 'La contraseña es incorrecta' });
        }

        //SI ES CORRECTO
        //CREAR Y FIRMAR LE JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //SEGUNDOS
        }, (error, token) => {
            if (error) throw error;

            //MENSAJE DE CONFIRMACION
            resp.json({ token })
        });

    } catch (error) {
        console.log(error);
    }

}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}
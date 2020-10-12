const Usuario = require('../models/Usuario');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, resp) => {

    //REVISAR SU HAY ERRORES
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errores: errors.array() });
    }

    const { email, password } = req.body;

    try {

        //REVISAR QUE EL USUARIO REGISTRADO SEA ÚNICO
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return resp.status(400).json({ msg: 'El usuario ya existe' });
        }

        //GURDAR
        usuario = new Usuario(req.body);

        //HASHEAR EL PASSWORD
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //GUARDAR USUARIO
        await usuario.save();

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
        resp.status(400).json('Hubo un error');
    }

}
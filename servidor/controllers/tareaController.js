const { validationResult } = require('express-validator');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

exports.crearTarea = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }


    try {

        const { proyecto } = req.body;
        const proyectoSel = await Proyecto.findById(proyecto);
        if (!proyectoSel) {
            return res.status(404).json({ msg: 'Proyecto no encontrado...' });
        }

        //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if (proyectoSel.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //CREAR LA TARES
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(tarea);


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error' });
    }

}

//OBTIENE TODOS LAS TAREAS POR PROYECTO
exports.obtenerTareas = async (req, res) => {

    try {

        //VALIDAR SI EL PROYECTO EXISTE
        const { proyecto } = req.body;
        const proyectoSel = await Proyecto.findById(proyecto);
        if (!proyectoSel) {
            return res.status(404).json({ msg: 'Proyecto no encontrado...' });
        }

        //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
        if (proyectoSel.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //OBTENER TAREAS
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error' });
    }

}

//ACTUALIZAR Tarea
exports.actualizarTarea = async (req, res) => {

    try {

        //VALIDAR SI EL PROYECTO EXISTE
        const { proyecto, nombre, estado } = req.body;

        //REVISAR SI LA TAREA EXISTE
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'No existe esa tarea...' });
        }

        //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado...' });
        }

        //CREAR UN OBJETO CON LA NUEVA INFORMACIIÓN
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;

        //GUARDAR LA TAREA
        tarea = await Tarea.findOneAndUpdate({ _id: tarea.id }, nuevaTarea, { new: true });
        res.json({ tarea });


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error' });
    }

}

exports.eliminarTarea = async (req, res) => {

    try {

        const { proyecto } = req.body;

        //REVISAR EL ID
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrada...' });

        //REVISAR SI EL PROYECTO ACTUAL PERTENECE AL USUARIO AUTENTICADO
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado...' });
        }

        //ELIMINAR EL PROYECTO
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada...' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Ocurrió un error' });
    }

}
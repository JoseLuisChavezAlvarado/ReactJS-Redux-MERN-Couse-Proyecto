const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = (req, res) => {
    try {

        const proyecto = new Proyecto(req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        //GUARDADR EL CREADOR VÍA JWT
        proyecto.creador = req.usuario.id;

        //GUARDAR PROYECTO
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Ocurrió un error' });
    }
}

//OBTIENE TODOS LOS PROYECTOS DEL USUARIO ACTUAL
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.status(200).json(proyectos);
    } catch (error) {
        console.log(error);

    }
}

//ACTUALIZAR PROYECTO
exports.actualizarProyecto = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    //EXTRAER LA INFORMACION DEL PROYECTO
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {

        //REVISAR EL ID
        let proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado...' });

        //VERIFICAR EL USUARIO
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //ACTUALIZAR
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Ocurrió un error' });
    }
}

exports.eliminarProyecto = async (req, res) => {

    try {

        //REVISAR EL ID
        let proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado...' });

        //VERIFICAR EL USUARIO
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //ELIMINAR EL PROYECTO
        await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado...' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Ocurrió un error' });
    }

}
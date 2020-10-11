import React, { useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { agregarTarea } = tareasContext;

    const [tarea, setTarea] = useState({
        nombre: ''
    });

    const { nombre } = tarea;

    if (!proyecto) return null;

    const [proyectoSeleccionado] = proyecto;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //VALIDAR

        //AGREGAR NUEVA TAREA
        tarea.proyectoId = proyectoSeleccionado.id;
        tarea.estado = false;
        agregarTarea(tarea);
        console.log(tarea);

        //REINICAR FORM

    }

    return (
        <div className='formulario'>
            <form
                onSubmit={handleSubmit}>
                <div className='contenedor-input'>
                    <input
                        type='text'
                        name='nombre'
                        value={nombre}
                        className='input-text'
                        onChange={handleChange}
                        placeholder='Nombre Tarea...' />
                </div>

                <div className='contenedor-input'>
                    <input
                        type='submit'
                        value='Agregar Tarea'
                        className='btn btn-primario bt-submit btn-block' />
                </div>
            </form>
        </div>
    );
}

export default FormTarea;
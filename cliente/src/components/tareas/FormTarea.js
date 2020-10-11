import React, { useContext, useEffect, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { agregarTarea, errorTarea, getTareasProyecto, setErrorTarea, tareaSeleccionada, actualizarTarea } = tareasContext;

    const [tarea, setTarea] = useState({
        nombre: ''
    });

    useEffect(() => {
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada);
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

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
        if (nombre === '') {
            setErrorTarea();
            return;
        }

        //AGREGAR / ACTUALIZAR NUEVA TAREA
        if (tareaSeleccionada === null) {
            tarea.proyectoId = proyectoSeleccionado.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
        }

        //OBTENER TAREAS
        getTareasProyecto(proyectoSeleccionado.id);

        //REINICAR FORM
        setTarea({
            nombre: ''
        })

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
                        value={tareaSeleccionada !== null ? 'Editar Tarea' : 'Agregar Tarea'}
                        className='btn btn-primario bt-submit btn-block' />
                </div>
            </form>

            {
                errorTarea
                    ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>
                    : null
            }

        </div>
    );
}

export default FormTarea;
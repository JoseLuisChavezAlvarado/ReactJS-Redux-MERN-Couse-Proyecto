import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, getTareasProyecto, cambiarEstadotarea, setTareaActual } = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //FUNCION QUE SE EJECUTA CUANDO EL USUARIO PRESIONA EL BOTÓN DE ELIMINAR TAREA
    const handleDelete = id => {
        getTareasProyecto(proyectoActual.id);
        eliminarTarea(id);
    }

    const [proyectoActual] = proyecto;

    const cambiarEstado = () => {
        tarea.estado = !tarea.estado;
        cambiarEstadotarea(tarea);
    }

    const selectTareaActual = () => {
        setTareaActual(tarea);
    }

    return (
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>

            <div className='estado'>
                {
                    tarea.estado
                        ? <button
                            type='button'
                            className='completo'
                            onClick={cambiarEstado}
                        >Completo</button>
                        : <button
                            type='button'
                            className='incompleto'
                            onClick={cambiarEstado}
                        >Incompleto</button>
                }
            </div>

            <div className='acciones'>

                <button
                    type='button'
                    onClick={selectTareaActual}
                    className='btn btn-primario'
                >Editar</button>

                <button
                    type='button'
                    onClick={() => handleDelete(tarea.id)}
                    className='btn btn-secundario'
                >Eliminar</button>

            </div>
        </li>
    );
}

export default Tarea;
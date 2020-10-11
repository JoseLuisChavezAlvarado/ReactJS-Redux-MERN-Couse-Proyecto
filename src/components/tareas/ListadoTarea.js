import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    if (!proyecto) return <h2>Selecciona un proyecto</h2>

    const [proyectoActual] = proyecto;

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className='listado-tareas'>

                {
                    tareasProyecto.length === 0
                        ? (<li className='tarea'>No hay tareas</li>)
                        : tareasProyecto.map(tarea => (
                            <Tarea tarea={tarea} />
                        ))
                }

                <button
                    type='button'
                    onClick={() => eliminarProyecto(proyectoActual.id)}
                    className='btn btn-eliminar'
                >Eliminar Proyecto</button>

            </ul>

        </Fragment>
    );
}

export default ListadoTarea;
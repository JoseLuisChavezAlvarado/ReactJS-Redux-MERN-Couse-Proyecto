import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                        : <TransitionGroup>
                            {
                                tareasProyecto.map(tarea => (
                                    <CSSTransition
                                        classNames='tarea'
                                        key={tarea.id}
                                        timeout={400}>
                                        <Tarea tarea={tarea} />
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                }

                <button
                    type='button'
                    onClick={() => eliminarProyecto(proyectoActual._id)}
                    className='btn btn-eliminar'
                >Eliminar Proyecto</button>

            </ul>

        </Fragment>
    );
}

export default ListadoTarea;
import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { getTareasProyecto } = tareasContext;

    const seleccionarProyecto = () => {
        proyectoActual(proyecto.id);
        getTareasProyecto(proyecto.id);
    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={seleccionarProyecto}
            >{proyecto.nombre}</button>
        </li>
    );
}

export default Proyecto;
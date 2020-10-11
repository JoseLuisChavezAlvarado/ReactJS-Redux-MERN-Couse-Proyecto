import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    //EXTRAER PROECTOS DEL STATE INICIAL
    const { proyectos, obtenerProyectos } = useContext(proyectoContext);

    //OBTERNER PROYECTOS CUANDO CARGA EL COMPONENTE
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);

    //REVISAR SI PROYECTOS TIENEN CONTENIDO
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className='listado-proyectos'>
            <TransitionGroup>
                {
                    proyectos.map(proyecto => (
                        <CSSTransition
                            classNames='proyecto'
                            key={proyecto.id}
                            timeout={400}>

                            <Proyecto proyecto={proyecto} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;
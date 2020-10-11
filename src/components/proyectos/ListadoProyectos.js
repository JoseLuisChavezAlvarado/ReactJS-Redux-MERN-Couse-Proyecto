import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

    //EXTRAER PROECTOS DEL STATE INICIAL
    const { proyectos, obtenerProyectos } = useContext(proyectoContext);

    //OBTERNER PROYECTOS CUANDO CARGA EL COMPONENTE
    useEffect(() => {
        obtenerProyectos();
    }, []);

    //REVISAR SI PROYECTOS TIENEN CONTENIDO
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className='listado-proyectos'>
            {
                proyectos.map(proyecto => (
                    <Proyecto
                        key={proyecto.id}
                        proyecto={proyecto} />
                ))
            }
        </ul>
    );
}

export default ListadoProyectos;
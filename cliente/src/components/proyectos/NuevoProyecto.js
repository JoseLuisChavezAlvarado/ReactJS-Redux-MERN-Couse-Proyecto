import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //OBTENER EL STATE DEL FORMULARIO
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mensajeErrorFormulario } = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({ ...proyecto, [e.target.name]: e.target.value });
    }


    const handleSubmit = e => {
        e.preventDefault();

        //VALIDA PROYECTO
        if (nombre.trim() === '') {
            mensajeErrorFormulario(true);
            return;
        }

        //AGREGAR AL STATE
        agregarProyecto(proyecto);

        //REINICIAR EL FORM
        setProyecto({
            nombre: ''
        });
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={onClickFormulario}
            > Nuevo Proyecto</button>

            { formulario
                ? <form
                    onSubmit={handleSubmit}
                    className='formulario-nuevo-proyecto'>

                    <input
                        type='text'
                        name='nombre'
                        className='input-text'
                        value={nombre}
                        onChange={onChangeProyecto}
                        placeholder='Nombre Proyecto' />

                    <input
                        type='submit'
                        value='Agregar Proyecto'
                        className='btn btn-primario btn-block' />

                </form>
                : null
            }

            { errorFormulario
                ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
                : null
            }

        </Fragment>
    );
}

export default NuevoProyecto;
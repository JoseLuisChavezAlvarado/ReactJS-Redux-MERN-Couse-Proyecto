import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { v4 as uuidv4 } from 'uuid';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, ERROR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';

const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Diseño de sitio web' },
        { id: 2, nombre: 'Tienda virtual' },
        { id: 3, nombre: 'Intranet' }
    ];

    const initialState = {
        errorFormulario: false,
        formulario: false,
        proyectos: [],
        proyecto: null,
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    //OBTENER LOS PROYECTOS
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTO,
            payload: proyectos
        });
    }

    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
    }

    const mensajeErrorFormulario = () => {
        dispatch({
            type: ERROR_FORMULARIO
        });
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                errorFormulario: state.errorFormulario,
                formulario: state.formulario,
                proyectos: state.proyectos,
                proyecto: state.proyecto,
                mensajeErrorFormulario,
                mostrarFormulario,
                eliminarProyecto,
                obtenerProyectos,
                agregarProyecto,
                proyectoActual
            }}>{props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;
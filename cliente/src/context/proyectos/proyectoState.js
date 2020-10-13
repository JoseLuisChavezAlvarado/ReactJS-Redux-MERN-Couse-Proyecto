import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, ERROR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';

const ProyectoState = props => {

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
    const obtenerProyectos = async () => {
        try {

            const result = await clienteAxios('api/proyectos');

            dispatch({
                type: OBTENER_PROYECTO,
                payload: result.data
            });

        } catch (error) {
            console.log(error);
        }
    }

    const agregarProyecto = async proyecto => {

        try {
            const result = await clienteAxios.post('api/proyectos', proyecto);

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: result.data
            });
        } catch (error) {
            console.log(error);
        }


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

        try {
            const result = clienteAxios.delete(`api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });

        } catch (error) {
            console.log(error);
        }

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
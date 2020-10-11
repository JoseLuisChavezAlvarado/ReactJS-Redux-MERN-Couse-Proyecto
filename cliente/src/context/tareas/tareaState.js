import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { v4 as uuidV4 } from 'uuid';

import { TAREAS_PROYECTO, AGREGAR_TAREA, ERROR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA } from '../../types';

const TareaState = props => {

    const initialState = {
        tareas: [
            { id: 1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
            { id: 3, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
            { id: 4, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
            { id: 5, nombre: 'Elegir hosting', estado: true, proyectoId: 2 },
            { id: 6, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { id: 7, nombre: 'Elegir colores', estado: false, proyectoId: 3 },
            { id: 8, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 1 },
            { id: 9, nombre: 'Elegir hosting', estado: true, proyectoId: 1 },
            { id: 10, nombre: 'Elegir plataforma', estado: true, proyectoId: 3 },
            { id: 11, nombre: 'Elegir colores', estado: false, proyectoId: 1 },
            { id: 12, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
            { id: 13, nombre: 'Elegir hosting', estado: true, proyectoId: 2 }
        ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //FUNCIONES
    const getTareasProyecto = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    const agregarTarea = tarea => {
        tarea.id = uuidV4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    const setErrorTarea = () => {
        dispatch({
            type: ERROR_TAREA
        })
    }

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    const cambiarEstadotarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const setTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareaSeleccionada: state.tareaSeleccionada,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                taeras: state.tareas,
                cambiarEstadotarea,
                getTareasProyecto,
                actualizarTarea,
                setTareaActual,
                setErrorTarea,
                eliminarTarea,
                agregarTarea,
            }}> { props.children}
        </TareaContext.Provider >
    );
}

export default TareaState;



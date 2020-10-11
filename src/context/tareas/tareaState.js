import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO, AGREGAR_TAREA } from '../../types';

const TareaState = props => {

    const initialState = {
        tareas: [
            { nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { nombre: 'Elegir colores', estado: false, proyectoId: 2 },
            { nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
            { nombre: 'Elegir hosting', estado: true, proyectoId: 2 },
            { nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
            { nombre: 'Elegir colores', estado: false, proyectoId: 3 },
            { nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 1 },
            { nombre: 'Elegir hosting', estado: true, proyectoId: 1 },
            { nombre: 'Elegir plataforma', estado: true, proyectoId: 3 },
            { nombre: 'Elegir colores', estado: false, proyectoId: 1 },
            { nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
            { nombre: 'Elegir hosting', estado: true, proyectoId: 2 }
        ],
        tareasProyecto: null
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
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                taeras: state.tareas,
                getTareasProyecto,
                agregarTarea
            }}> { props.children}
        </TareaContext.Provider >
    );
}

export default TareaState;



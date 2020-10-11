import { FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, ERROR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                formulario: false,
                errorFormulario: false,
                proyectos: [...state.proyectos, action.payload]
            }
        case ERROR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto.id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyecto: null,
                proyectos: state.proyectos.filter(proyecto => proyecto.id !== action.payload)
            }
        default: return state;
    }
}
import {
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION,
    LOGIN_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                mensaje: null,
                cargando: false,
                autenticado: true
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                cargando: false,
                usuario: action.payload
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                mensaje: action.payload,
                autenticado: null,
                cargando: false,
                usuario: null,
                token: null
            }

        default:
            return state;
    }
}


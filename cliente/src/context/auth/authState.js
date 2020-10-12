import React, { useReducer } from 'react';
import { REGISTRO_ERROR, REGISTRO_EXITOSO, LOGIN_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, CERRAR_SESION } from '../../types';
import clienteAxios from '../../config/axios';
import authContext from './authContext';
import authReducer from './authReducer';
import tokenAuth from '../../config/token';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    //FUNCIONES ==================================================================
    const registrarUsuario = async datos => {
        try {

            const respuesta = await clienteAxios.post('api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //FUNCION PARA ENVIAR EL TOKEN POR HEADERS
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    //==============================================================

    return (
        <authContext.Provider
            value={{
                autenticado: state.autenticado,
                cargando: state.cargando,
                usuario: state.usuario,
                mensaje: state.mensaje,
                token: state.token,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthState;
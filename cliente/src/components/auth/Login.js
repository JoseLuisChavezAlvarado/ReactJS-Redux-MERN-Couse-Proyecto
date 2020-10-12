import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import alertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {

    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje, autenticado, iniciarSesion } = authsContext;

    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, props.history]);

    //======================================================================
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = e => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        iniciarSesion({ email, password });
    }

    return (
        <div className='form-usuario'>

            {alerta ? <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> : null}

            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={handleSubmit}>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Tu email' />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Tu password' />
                    </div>

                    <div className='campo-form'>
                        <input
                            type='submit'
                            value='Iniciar Sesión'
                            className='btn btn-primario btn-block' />
                    </div>
                </form>

                <Link
                    to={'/nueva-cuenta'}
                    className='enlace-cuenta'
                >Obtener Cuenta</Link>

            </div>
        </div>
    );
}

export default Login;
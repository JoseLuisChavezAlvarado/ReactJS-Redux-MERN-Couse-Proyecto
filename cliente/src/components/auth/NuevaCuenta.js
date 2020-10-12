import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import alertaContext from '../../context/alertas/alertaContext';

const NuevaCuenta = (props) => {

    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje, autenticado, registrarUsuario } = authsContext;

    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, props.history]);

    const [usuario, setUsuario] = useState({
        email: '',
        nombre: '',
        password: '',
        confirmar: ''
    });

    const { email, nombre, password, confirmar } = usuario;

    const onChange = e => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //VALIDAR QUE NO HAYA AMPOS VACIOS
        if (email.trim() === '' || nombre.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //PASSWORD DE 6 CARACTERES
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        //LOS DOS PASSWORD SON IGUALES
        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }

        //PASARLO AL ACTION
        registrarUsuario({ nombre, email, password });
    }

    return (
        <div className='form-usuario'>

            {alerta ? <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> : null}

            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={handleSubmit}>

                    <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            id='nombre'
                            type='text'
                            name='nombre'
                            value={nombre}
                            onChange={onChange}
                            placeholder='Tu nombre' />
                    </div>

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
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input
                            id='confirmar'
                            type='password'
                            name='confirmar'
                            value={confirmar}
                            onChange={onChange}
                            placeholder='Repite tu password' />
                    </div>

                    <div className='campo-form'>
                        <input
                            type='submit'
                            value='Registrarme'
                            className='btn btn-primario btn-block' />
                    </div>
                </form>

                <Link
                    to={'/'}
                    className='enlace-cuenta'
                >Iniciar Sesion</Link>

            </div>
        </div>
    );
}

export default NuevaCuenta;
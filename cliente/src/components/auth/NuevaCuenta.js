import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {

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
    }

    return (
        <div className='form-usuario'>
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
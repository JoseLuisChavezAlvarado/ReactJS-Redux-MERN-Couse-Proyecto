import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

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
    }

    return (
        <div className='form-usuario'>
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
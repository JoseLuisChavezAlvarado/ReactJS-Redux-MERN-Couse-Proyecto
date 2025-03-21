import React, { useContext, useEffect } from 'react';
import ListadoTarea from '../tareas/ListadoTarea';
import AuthContext from '../../context/auth/authContext';
import FormTarea from '../tareas/FormTarea';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';

const Proyectos = () => {

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
       usuarioAutenticado();
    }, []);

    return (
        <div className='contenedor-app'>

            <Sidebar />

            <div className='seccion-principal'>
                <Barra />

                <main>

                    <FormTarea />

                    <div className='contenedor-tareas'>
                        <ListadoTarea />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Proyectos;
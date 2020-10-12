import React from 'react';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import TareaState from './context/tareas/tareaState';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProyectoState from './context/proyectos/proyectoState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada'

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;

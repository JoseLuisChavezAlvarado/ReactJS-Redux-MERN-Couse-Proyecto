import React from 'react';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import TareaState from './context/tareas/tareaState';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProyectoState from './context/proyectos/proyectoState';

function App() {
  return (

    <ProyectoState>
      <TareaState>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
            <Route exact path='/proyectos' component={Proyectos} />
          </Switch>
        </BrowserRouter>
      </TareaState>
    </ProyectoState>

  );
}

export default App;
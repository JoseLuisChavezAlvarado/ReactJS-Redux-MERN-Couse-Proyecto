const express = require('express');
const connectDB = require('./config/db.js');

//CREAR EL SERVIDOR
const app = express();

//CONECTAR A LA BASE DE DATOS
connectDB();

//HABILITAR EXPRESS JSON
app.use(express.json({ extended: true }));

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

//IMPORTAR RUTAS
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/auth', require('./routes/auth'));

//ARRANCAR LA APP
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
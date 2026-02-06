const express = require('express');
const path = require('path'); // Importante para manejar rutas de carpetas
const app = express();
const session = require('express-session'); // Para manejar sesiones
const PORT = 3000;

const { logRequest } = require('./middleware.js');

// 1. Importa tus rutas de JS (estos sí llevan require)
const usuariosRouter = require('./users.js'); 

const productosRouter = require('./products.js');
const tareasRouter = require('./tareas.js');
const authRouter = require('./auth.js');

app.use(logRequest); // Middleware global: SE COLOCA ANTES DE TODAS LAS RUTAS
app.use(express.json()); // Middleware para parsear JSON
app.use(session({
    secret: 'contraseña', //secret equivale a la contraseña
    resave: false, //no guarda de nuevo
    saveUninitialized: false, //no guarda si no hay cambios
    cookie: {secure: false} //en true solo trabaja con https y guarda cookies
}));

// 2. Configura la carpeta 'front' para que Express sirva el HTML, CSS y JS
// Esto reemplaza la necesidad de hacer require del index.html
app.use(express.static(path.join(__dirname, '../front')));

// 3. Usa tus routers de la API
app.use('/users', usuariosRouter);
app.use('/login', authRouter);
app.use('/products', productosRouter);
app.use('/tareas', tareasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
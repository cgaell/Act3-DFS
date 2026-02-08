const express = require('express');
const path = require('path'); // Importante para manejar rutas de carpetas
const app = express();
const session = require('express-session'); // Para manejar sesiones
const PORT = 3000;
const fs = require('fs').promises;

const { logRequest, isAdmin } = require('./middleware.js');

// 1. Importa tus rutas de JS (estos sí llevan require)
const usuariosRouter = require('./users.js'); 
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

// Ruta raíz: si no hay sesión, redirige a /login; si hay sesión, sirve el index
app.get('/', (req, res) => {
    if (req.session && req.session.user) {
        return res.sendFile(path.join(__dirname, '../front/index.html'));
    } else {
        return res.redirect('/login');
    }
});

// 2. Configura la carpeta 'front' para que Express sirva el HTML, CSS y JS
// Esto reemplaza la necesidad de hacer require del index.html
app.use(express.static(path.join(__dirname, '../front')));

// 3. Usa tus routers de la API
app.use('/users', usuariosRouter);
app.use('/login', authRouter);
app.use('/tareas', require('./middleware.js').validateSession, tareasRouter);

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/register.html'));
});

app.post('/register', (req, res) => {
    (async () => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username y password son requeridos' });
        }
        const dataPath = path.join(__dirname, 'users.json');
        let users = [];
        try {
            const content = await fs.readFile(dataPath, 'utf8');
            users = JSON.parse(content);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                return res.status(500).json({ error: 'Error leyendo usuarios' });
            }
        }
        if (users.some(u => u.name === username)) {
            return res.status(409).json({ error: 'Usuario ya existe' });
        }
        const user = { id: Date.now(), name: username, password, role: 'viewer' };
        users.push(user);
        try {
            await fs.writeFile(dataPath, JSON.stringify(users, null, 2), 'utf8');
        } catch {
            return res.status(500).json({ error: 'Error guardando usuarios' });
        }
        req.session.user = { id: user.id, name: user.name, role: user.role };
        return res.status(201).json({ message: 'Registro exitoso' });
    })();
});

app.get('/admin/tareas', isAdmin, (req, res) => {
    // Definimos la ruta hacia el archivo tareas.json
    const filePath = path.join(__dirname, 'tareas.json');
    
    // Enviamos el archivo físico al cliente
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error al enviar el archivo:", err);
            res.status(500).json({ error: "No se encontró el archivo de tareas" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

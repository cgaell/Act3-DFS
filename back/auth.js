const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Simulación de base de datos con roles
    if (username === 'admin' && password === '1234') {
        req.session.user = { id: 1, name: 'admin', role: 'admin' }; // Guardamos el rol admin
        return res.status(200).json({ message: 'Bienvenido, admin' });
    } 
    else if (username === 'user' && password === '5678') {
        req.session.user = { id: 2, name: 'user', role: 'viewer' }; // Usuario normal
        return res.status(200).json({ message: 'Bienvenido, Usuario' });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
});


module.exports = router;

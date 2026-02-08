const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    const { username, password } = req.body;

    //simulacion de validacion en caso de que se maneje una base de datos
    if ( username === 'admin' && password === '1234') {

        //crear la sesion
        req.session.user = { id: 1, name: 'admin' };
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }

    return res.status(401).json({
        error: 'Credenciales inválidas'
    });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    //simulacion de validacion en caso de que se maneje una base de datos
    if ( username === 'admin' && password === '1234') {
        return res.status(200).json({ message: 'Registro exitoso' });
    }

    return res.status(401).json({
        error: 'Error en el registro'
    });
});

module.exports = router;

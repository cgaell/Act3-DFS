const express = require('express');
const router = express.Router(); // crear el objeto router


//ruta para la pagina principal de usuarios /usuarios
router.get('/', (req, res) => {
    res.send('Bienvenido a la pagina de usuarios');

});


router.get('/:id', (req, res) => {
    res.send(`Detalle del usuario con ID: ${req.params.id}`);

});


module.exports = router; // exportar el router

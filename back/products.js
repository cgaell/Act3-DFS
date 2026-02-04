const express = require('express');
const router = express.Router(); // crear el objeto router


//ruta para la pagina principal de productos /productos
router.get('/', (req, res) => {
    res.send('Bienvenido a la pagina de productos');

});


router.get('/:id', (req, res) => {
    res.send(`Detalle del producto con ID: ${req.params.id}`);

});


module.exports = router; // exportar el router

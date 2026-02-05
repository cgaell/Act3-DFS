const express = require('express');
const router = express.Router(); // crear el objeto router


const { validateUserID, validateProductID } = require('./middleware.js');
const { route } = require('./users.js');

//ruta para la pagina principal de productos /productos
router.get('/', (req, res) => {
    //res.send('Bienvenido a la pagina de productos');


    res.status(200).json({ total: 3 ,
        productos: [{ id: "producto01", nombre: "Mouse",  precio: 25.00, cantidad: 100 },
            { id: "producto02", nombre: "Producto 2", precio: 30.00, cantidad: 200 },
            { id: "producto03", nombre: "Teclado", precio: 45.00, cantidad: 150 }
        ] // Aquí iría la lista de productos
    })
});

router.get('/nuevo', validateProductID, (req, res) => {
    res.status(201).json({
        message: 'Se agregó un nuevo producto',
        timestamp: new Date()
    });
});

router.get('/:id', validateProductID, (req, res) => {
    //res.send(`Detalle del producto con ID: ${req.params.id}`);
    res.status(200).json({
        message: `Detalle del producto encontrado: ${req.params.id}`
    })
});

module.exports = router; // exportar el router

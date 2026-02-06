const express = require('express');
const router = express.Router(); // crear el objeto router

const { validateUserID, validateSession } = require('./middleware.js');

//ruta para la pagina principal de usuarios /usuarios
router.get('/', validateSession, (req, res) => {
    //res.send('Bienvenido a la pagina de usuarios');

    res.status(200).json({ total: 2 ,
        usuarios: [{ id: "user01", nombre: "Ricardo Arturo" },
            { id: "user02", nombre: "Juan Perez" }] // Aquí iría la lista de usuarios
    })
});


router.get('/:id', validateUserID, (req, res) => {
    //res.send(`Detalle del usuario con ID: ${req.params.id}`);
    res.status(200).json({
        message: `Detalle del usuario encontrado: ${req.params.id}`
    })
});


module.exports = router; // exportar el router

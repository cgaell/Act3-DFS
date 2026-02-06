//CRUD de las tareas

const express = require('express');
const router = express.Router(); // crear el objeto router


const {validateTaskID } = require('./middleware.js');  //valida que el ID de la tarea exista
const { route } = require('./users.js'); //valida que el ID de la tarea exista

let tareas = []; //arreglo vacio para almacenar las tareas


//ruta para la pagina principal de tareas /tareas
router.get('/', (req, res) => {
    res.status(200).json({ 
        total: tareas.length,
        tareas: tareas 
    });
});

//ruta para crear una nueva tarea /tareas
router.post('/', (req, res) => {
    const nuevaTarea = req.body;
    // Asignar ID si no viene (aunque el front lo está generando)
    if (!nuevaTarea.id) {
        nuevaTarea.id = Date.now();
    }
    tareas.push(nuevaTarea); //agregar la nueva tarea al arreglo de tareas
    res.status(201).json({
        message: 'Tarea creada exitosamente',
        tarea: nuevaTarea //retorna la tarea creada
    });
});

//ruta para actualizar el estado de una tarea /tareas/:id
router.put('/:id', validateTaskID, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const taskIndex = tareas.findIndex(t => t.id === id);
    //condicion para verificar si la tarea es valida o tiene un id existente
    if (taskIndex !== -1) {
        tareas[taskIndex].status = status; //actualizar el estado de la tarea
        res.status(200).json({ message: 'Tarea actualizada', tarea: tareas[taskIndex] });
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

//ruta para eliminar una tarea /tareas/:id
router.delete('/:id', validateTaskID, (req, res) => { 
    const { id } = req.params;
    const initialLength = tareas.length;
    tareas = tareas.filter(t => t.id != id); //filtra el id de las tareas que no tengan el id que se quiere eliminar
    // si la longitud del arreglo es menor que la inicial que se actualizo, elimina la tarea
    if (tareas.length < initialLength) {
        res.status(200).json({ message: 'Tarea eliminada' });
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

//ruta para agregar una nueva tarea /tareas/nuevo (parte del ejemplo del jueves)
router.get('/nuevo', validateTaskID, (req, res) => {
    res.status(201).json({
        message: 'Se agregó una nueva tarea',
        timestamp: new Date()
    });
});

//ruta para obtener los detalles de una tarea /tareas/:id
router.get('/:id', validateTaskID, (req, res) => {
    //res.send(`Detalle del producto con ID: ${req.params.id}`);
    res.status(200).json({
        message: `Detalle de la tarea encontrada: ${req.params.id}`
    })
});

module.exports = router; // exportar el router
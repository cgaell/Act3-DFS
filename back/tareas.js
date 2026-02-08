const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { validateTaskID } = require('./middleware.js');
const { route } = require('./users.js');

const DATA_PATH = path.join(__dirname, 'tareas.json');

async function readTareas() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

async function writeTareas(tareas) {
    await fs.writeFile(DATA_PATH, JSON.stringify(tareas, null, 2), 'utf8');
}

router.get('/', async (req, res) => {
    try {
        const tareas = await readTareas();
        res.status(200).json({
            total: tareas.length,
            tareas
        });
    } catch (err) {
        res.status(500).json({ message: 'Error leyendo tareas' });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevaTarea = req.body;
        if (!nuevaTarea.id) {
            nuevaTarea.id = Date.now();
        }
        const tareas = await readTareas();
        tareas.push(nuevaTarea);
        await writeTareas(tareas);
        res.status(201).json({
            message: 'Tarea creada exitosamente',
            tarea: nuevaTarea
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creando tarea' });
    }
});

router.put('/:id', validateTaskID, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const tareas = await readTareas();
        const taskIndex = tareas.findIndex(t => t.id == id);
        if (taskIndex !== -1) {
            tareas[taskIndex].status = status;
            await writeTareas(tareas);
            res.status(200).json({ message: 'Tarea actualizada', tarea: tareas[taskIndex] });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error actualizando tarea' });
    }
});

router.delete('/:id', validateTaskID, async (req, res) => {
    try {
        const { id } = req.params;
        const tareas = await readTareas();
        const initialLength = tareas.length;
        const nuevas = tareas.filter(t => t.id != id);
        if (nuevas.length < initialLength) {
            await writeTareas(nuevas);
            res.status(200).json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error eliminando tarea' });
    }
});

router.get('/nuevo', validateTaskID, (req, res) => {
    res.status(201).json({
        message: 'Se agregó una nueva tarea',
        timestamp: new Date()
    });
});

router.get('/:id', validateTaskID, (req, res) => {
    res.status(200).json({
        message: `Detalle de la tarea encontrada: ${req.params.id}`
    });
});



module.exports = router;

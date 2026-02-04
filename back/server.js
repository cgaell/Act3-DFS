const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta actual
app.use(express.static(__dirname));

// Ruta principal para cargar tu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
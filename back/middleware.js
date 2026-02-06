const logRequest = (req, res, next) => {
    //registrar el metodo {get, post y la ruta {path}}
    console.log(`Solicitud recibida: ${req.method} en ${req.path}`);
    //permite que el flujo continue al siguiente middleware
    next();
}

const validateUserID = (req, res, next) => {
    const { id } = req.params;
    if (id && id.length <= 2){
        return res.status(400).json({ error: 'Formato de ID de usuario no valido. Debe de tener mas de 2 caracteres.' });
    }

    //si todo esta bien, continua
    next();
}


const validateProductID = (req, res, next) => {
    const { id } = req.params;
    if (id && id.length <= 3){
        return res.status(401).json({ error: 'Formato de ID de producto no valido. Debe de tener mas de 3 caracteres.' });
    }

    //si todo esta bien, continua
    next();
}


const validateTaskID = (req, res, next) => {
    const { id } = req.params;
    if (id && id.length <= 3){
        return res.status(402).json({ error: 'Formato de ID de tarea no valido. Debe de tener mas de 3 caracteres.' });
    }

    //si todo esta bien, continua
    next();
}

module.exports = {
    logRequest,
    validateUserID,
    validateProductID,
    validateTaskID
};
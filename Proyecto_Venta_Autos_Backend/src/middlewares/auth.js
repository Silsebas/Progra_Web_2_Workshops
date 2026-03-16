// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Leer el token que el frontend nos envía en la "cabecera" (header)
    const token = req.header('x-auth-token'); 

    // 2. Revisar si no hay token (el usuario es un visitante no registrado)
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, permiso denegado. Debes iniciar sesión.' });
    }

    // 3. Validar si el token es real y no ha sido alterado
    try {
        // IMPORTANTE: Aquí usamos la misma variable de entorno secreta que creamos 
        // el token en authController de login/registro. la variable esta en .env
        const cifrado = jwt.verify(token, process.env.JWT_SECRET || 'secreta'); 
        
        // Si el token es válido, extraemos el ID del usuario y lo guardamos en 'req.usuario'
        req.usuario = cifrado.user || cifrado.usuario || cifrado; // nombre en el authController y si no lo encuentra lo toma del token
        
        // next() lo déjamos pasar a la ruta"
        next(); 
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
};
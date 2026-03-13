const express = require('express');
const router = express.Router();

// Importamos el controlador de autenticación
const { registrarUsuario, loginUsuario} = require('../controllers/authController');

// Definimos la ruta de Registro. 
// Cuando alguien haga un POST a esta dirección, se ejecutará 'registrarUsuario'
router.post('/register', registrarUsuario);

// Definimos la ruta de login
router.post('/login', loginUsuario);

// Exportamos las rutas para que el archivo principal (index.js) las reconozca
module.exports = router;
// src/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middlewares/auth');

// NOTA: Para la ruta POST, se necesita poner el Middleware en el medio.
// Por ahora la dejaremos así para armar la estructura.

// Ruta POST: http://localhost:4000/api/vehicles (Para publicar)
// Le ponemos el middleware 'auth' en el medio
router.post('/', auth, vehicleController.crearVehiculo);

// Ruta GET: http://localhost:4000/api/vehicles (Para ver el catálogo)
// Esta queda libre para que cualquiera pueda ver el catálogo
router.get('/', vehicleController.obtenerVehiculos);

module.exports = router;
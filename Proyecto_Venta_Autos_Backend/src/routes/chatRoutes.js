// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middlewares/auth'); 

// Todas estas rutas requieren estar logueado
// POST: api/chats -> Crea un chat o agrega un mensaje
router.post('/', auth, chatController.crearObtenerChat);

// GET: api/chats -> Obtiene todos los chats del usuario para la lista lateral
router.get('/', auth, chatController.obtenerMisChats);

module.exports = router;
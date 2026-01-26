require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('Error de conexión:', error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

// 1. PRIMERO: Configurar que Express
app.use(express.json());

// 2. SEGUNDO: Cargar las rutas desde el archivo routes/routes.js
const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at 3000`);
});
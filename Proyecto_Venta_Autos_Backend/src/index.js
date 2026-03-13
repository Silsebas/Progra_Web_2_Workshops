const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Le dice a Node que lea el archivo .env
const connectDB = require('./config/db'); // Importa el archivo de conexión
const authRoutes = require('./routes/authRoutes');// Importamos el archivo de rutas de autenticación

// 1. Inicializamos la aplicación
const app = express();

// Conectar a la Base de Datos
connectDB(); //

// 2. Middlewares los intermediarios de las rutas, para procesar datos, manejar CORS, etc.
app.use(cors()); 
app.use(express.json()); 

// 3. Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: "¡El servidor del Market de Vehículos está funcionando perfectamente!" });
});

// Le decimos a la app que use estas rutas. 
// La URL final para registrarse será: http://localhost:4000/api/users/register
app.use('/api/users', authRoutes);

// 4. Definimos el puerto y encendemos el servidor
// Usar el puerto del .env, si falla, usará el 4000
const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log(`Servidor corriendo y escuchando en http://localhost:${PORT}`);
});
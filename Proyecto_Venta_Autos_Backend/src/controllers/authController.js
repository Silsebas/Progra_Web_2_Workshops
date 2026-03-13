// Importamos el modelo User que acabamos de crear
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Importamos la librería para manejar JSON Web Tokens (JWT)

// Función auxiliar para crear el token
const generarToken = (id) => {
    // sign() crea el token uniendo el ID del usuario con la palabra secreta del .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h', // El token será válido por 2 horas para mayor seguridad
    });
};

// Esta es la función que se ejecutará cuando alguien intente registrarse
const registrarUsuario = async (req, res) => {
    try {
        // 1. Extraemos los datos que nos enviará el Frontend o Postman
        const { name, email, password } = req.body;

        // 2. Revisamos si ya existe alguien con ese correo en la base de datos
        const usuarioExiste = await User.findOne({ email });
        
        if (usuarioExiste) {
            // Si existe, detenemos todo y enviamos un error 400 (Bad Request)
            return res.status(400).json({ mensaje: 'El correo ya está registrado en el sistema' });
        }

        // 3. Si el correo está libre, creamos el usuario usando nuestro Modelo User
        const usuario = await User.create({
            name,
            email,
            password
        }); // Mongoose automáticamente encriptará la contraseña gracias a lo que hicimos antes en el Schema de User

        // 4. Le respondemos al Frontend que todo salió bien (Status 201: Creado)
        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: generarToken(usuario._id) // Generamos un token para el usuario recién creado
            }
        });

    } catch (error) {
        // Si algo explota, capturamos el error
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al registrar el usuario' });
    }
};

// 2. Función de Login
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscamos si el correo existe en la base de datos
        const usuario = await User.findOne({ email });
        
        if (!usuario) {
            // Error 401: No autorizado, porque el correo no existe
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' }); 
        }

        // Comparamos la contraseña que escribió con la encriptada en la base de datos
        // Usamos la función 'matchPassword' que esta en el archivo User.js
        const passwordCorrecta = await usuario.matchPassword(password);
        
        if (!passwordCorrecta) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        // Si el correo y la contraseña coinciden, le damos acceso y su Token JWT
        res.json({
            mensaje: 'Login exitoso',
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: generarToken(usuario._id)
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor al iniciar sesión' });
    }
};

// Exportamos la función para poder usarla en las Rutas
module.exports = { registrarUsuario, loginUsuario };
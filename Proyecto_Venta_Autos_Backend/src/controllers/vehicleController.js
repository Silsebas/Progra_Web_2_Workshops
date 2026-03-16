// src/controllers/vehicleController.js
const Vehicle = require('../models/Vehicle');

// 1. Crear un vehículo (Solo para usuarios logueados)
exports.crearVehiculo = async (req, res) => {
    try {
        // Creamos el auto con los datos que manda el Frontend (req.body)
        const nuevoVehiculo = new Vehicle({
            ...req.body,
            // req.usuario.id existirá gracias al Token de seguridad que configuraremos
            vendedor: req.usuario.id 
        });

        await nuevoVehiculo.save();
        res.status(201).json({ mensaje: 'Vehículo publicado con éxito', vehiculo: nuevoVehiculo });
        
    } catch (error) {
        console.error('Error al crear vehículo:', error);
        res.status(500).json({ mensaje: 'Hubo un error al publicar el vehículo' });
    }
};

// 2. Obtener todos los vehículos (Público, para el catálogo)
exports.obtenerVehiculos = async (req, res) => {
    try {
        // .populate() en lugar de traernos solo el ID del vendedor, 
        // busca en la tabla Users y nos trae su nombre y correo para mostrarlo en el frontend.
        const vehiculos = await Vehicle.find().populate('vendedor', 'name email');
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener los vehículos' });
    }
};
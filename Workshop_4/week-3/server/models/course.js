const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    nombre: {
        required: true,
        type: String
    },
    codigo: {
        required: true,
        type: String
    },
    descripcion: {
        required: true,
        type: String
    },
    idProfesor: {
        required: true,
        type: String
    }

})

module.exports = mongoose.model('Course', courseSchema)
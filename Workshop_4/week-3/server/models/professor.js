// Archivo: models/professor.js
const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nombre: {
    required: true,
    type: String
  },
  apellidos: {
    required: true,
    type: String
  },
  cedula: {
    required: true,
    type: String
  },
  edad: {
    required: true,
    type: Number
  }
});

// Exportamos el module para poder usarlo en otras partes del servidor
module.exports = mongoose.model('Professor', professorSchema);
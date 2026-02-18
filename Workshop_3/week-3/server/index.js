const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Course = require('./models/course');
const Professor = require('./models/professor');

mongoose.connect('mongodb://127.0.0.1:27017/admin');
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));


//routes
app.post('/courses', async (req, res) => {
    const course = new Course({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        idProfesor: req.body.idProfesor
    })

    try {
        const courseCreated = await course.save();
        //add header location to the response
        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

app.post('/professors', async (req, res) => {
    const professor = new Professor({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        edad: req.body.edad
    })

    try {
        const professorCreated = await professor.save();
        //add header location to the response
        res.header('Location', `/professor?id=${professorCreated._id}`);
        res.status(201).json(professorCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

app.get('/courses', async (req, res) => {
    try{
        //if id is passed as query param, return single course else return all courses
        if(!req.query.id){
            const data = await Course.find();
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/professors', async (req, res) => {
    try{
        //if id is passed as query param, return single course else return all courses
        if(!req.query.id){
            const data = await Professor.find();
            return res.status(200).json(data)
        }
        const data = await Professor.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Método PATCH para actualizar por ID

app.put('/professors/:id', async (req, res) => { 
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true }; // Esto hace que nos devuelva el profesor ya con los cambios

        const result = await Professor.findByIdAndUpdate(
            id, updatedData, options
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/courses/:id', async (req, res) => { 
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true }; // Esto hace que nos devuelva el curso ya con los cambios

        const result = await Course.findByIdAndUpdate(
            id, updatedData, options
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Método DELETE para borrar por ID
app.delete('/professors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Professor.findByIdAndDelete(id);
        res.status(200).json({ message: `El profesor ${data.nombre} ha sido eliminado.` });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/courses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Course.findByIdAndDelete(id);
        res.status(200).json({ message: `El curso ${data.nombre} ha sido eliminado.` });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))

const express = require('express');
const router = express.Router();
const Model = require('../model/model');

// Método POST para enviar datos
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Método GET para obtener todos los datos
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Método GET para obtener por ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Método PATCH para actualizar por ID
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true }; // Esta opción devuelve el documento ya actualizado

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Método DELETE para borrar por ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`El documento con el nombre ${data.name} ha sido eliminado.`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;
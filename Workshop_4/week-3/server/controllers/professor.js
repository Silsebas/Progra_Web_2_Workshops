const Professor = require('../models/professor');

const professorPost = async (req, res) => {
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
};


const professorGet = async (req, res) => {
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
}

// Método PATCH para actualizar por ID

const professorPut = async (req, res) => { 
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
};

// Método DELETE para borrar por ID
const professorDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Professor.findByIdAndDelete(id);
        res.status(200).json({ message: `El profesor ${data.nombre} ha sido eliminado.` });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
  professorPost,
  professorGet,
  professorPut,
  professorDelete
}
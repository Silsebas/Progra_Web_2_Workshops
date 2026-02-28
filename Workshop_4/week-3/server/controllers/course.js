//routes
const Course = require('../models/course');

const coursePost = async (req, res) => {
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
};

const courseGet = async (req, res) => {
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
}

const coursePut = async (req, res) => { 
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
};

const courseDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Course.findByIdAndDelete(id);
        res.status(200).json({ message: `El curso ${data.nombre} ha sido eliminado.` });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
  coursePost,
  courseGet,
  coursePut,
  courseDelete

}
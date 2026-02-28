const express = require('express');
const router = express.Router();
const { coursePost, courseGet, coursePut, courseDelete } = require('../controllers/course');

router.post('/courses', coursePost);
router.get('/courses', courseGet);
router.put('/courses/:id', coursePut);
router.delete('/courses/:id', courseDelete);

module.exports = router;
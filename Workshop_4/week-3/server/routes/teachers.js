const express = require('express');
const router = express.Router();
const { professorPost, professorGet, professorPut, professorDelete } = require('../controllers/professor');

router.post('/teachers', professorPost);
router.get('/teachers', professorGet);
router.put('/teachers/:id', professorPut);
router.delete('/teachers/:id', professorDelete);

module.exports = router;
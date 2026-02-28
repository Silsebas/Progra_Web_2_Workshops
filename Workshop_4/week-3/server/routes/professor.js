const express = require('express');
const router = express.Router();
const { coursePost, courseGet } = require("../controllers/professor");

router.post('/professors', coursePost);
router.get('/professors', courseGet);
router.put('/professors/:id', coursePut);
router.delete('/professors/:id', courseDelete);

module.exports = router;
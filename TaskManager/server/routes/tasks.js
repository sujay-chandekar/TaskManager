const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, getTasks);
router.post('/', auth, addTask);
router.put('/:id', auth, updateTask);

module.exports = router;

const express = require('express');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');
const router = express.Router();

// Create a new task
router.post('/', createTask);

// Get tasks (pagination + sorting via query params)
router.get('/', getTasks);

// Update a task by id
router.put('/:id', updateTask);

module.exports = router;

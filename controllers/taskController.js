const Task = require('../models/task');
const User = require('../models/user');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { body } = req.body;

    if (userRole !== 'basic') {
      return res.status(403).json({ error: 'Admins cannot create tasks' });
    }

    const task = await Task.create(body, userId);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TASKS (with pagination & sorting)
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'desc' } = req.query;

    const userId = req.user.id;
    const userRole = req.user.role;

    let tasks;
    if (userRole === 'basic') {
      tasks = await Task.getByUser(userId, page, limit, sort);
    } else if (userRole === 'admin') {
      tasks = await Task.getAll(page, limit, sort);
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { id } = req.params;
    const { body } = req.body;

    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (userRole === 'basic' && task.user_id !== userId) {
      return res.status(403).json({ error: 'Cannot update others tasks' });
    }

    const updatedTask = await Task.update(id, body);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

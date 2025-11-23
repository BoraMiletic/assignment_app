const Task = require('../models/task');
const User = require('../models/user');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { username, body } = req.body;

    const user = await User.findByUsernameOrEmail(username, username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role !== 'basic') {
      return res.status(403).json({ error: 'Admins cannot create tasks' });
    }

    const task = await Task.create(body, user.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TASKS (with pagination & sorting)
exports.getTasks = async (req, res) => {
  try {
    const { username, page = 1, limit = 10, sort = 'desc' } = req.query;

    const user = await User.findByUsernameOrEmail(username, username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let tasks;
    if (user.role === 'basic') {
      tasks = await Task.getByUser(user.id, page, limit, sort);
    } else if (user.role === 'admin') {
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
    const { username, body } = req.body;
    const { id } = req.params;

    const user = await User.findByUsernameOrEmail(username, username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const task = await Task.getById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (user.role === 'basic' && task.user_id !== user.id) {
      return res.status(403).json({ error: 'Cannot update others tasks' });
    }

    const updatedTask = await Task.update(id, body);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pool = require('../db');

const TaskModel = {
  create: async (body, user_id) => {
    const result = await pool.query(
      'INSERT INTO tasks (body, user_id) VALUES ($1, $2) RETURNING *',
      [body, user_id]
    );
    return result.rows[0];
  },

  getAll: async (page = 1, limit = 10, sort = 'desc') => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT * FROM tasks ORDER BY created_at ${sort.toUpperCase()} LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  },

  getByUser: async (user_id, page = 1, limit = 10, sort = 'desc') => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ${sort.toUpperCase()} LIMIT $2 OFFSET $3`,
      [user_id, limit, offset]
    );
    return result.rows;
  },

  getById: async (task_id) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [task_id]);
    return result.rows[0];
  },

  update: async (task_id, body) => {
    const result = await pool.query(
      'UPDATE tasks SET body = $1 WHERE id = $2 RETURNING *',
      [body, task_id]
    );
    return result.rows[0];
  }
};

module.exports = TaskModel;

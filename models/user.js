const pool = require('../db');

const UserModel = {
  // Create a new user
  create: async ({ firstName, lastName, username, email, password, role }) => {
    const result = await pool.query(
      `INSERT INTO users (firstName, lastName, username, email, password, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, firstName, lastName, username, email, role, created_at AS "createdAt"`,
      [firstName, lastName, username, email, password, role]
    );
    return result.rows[0];
  },

  // Get a user by username or email (for uniqueness check)
  findByUsernameOrEmail: async (username, email) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );
    return result.rows[0]; // returns undefined if not found
  },

  // Get user by ID
  findById: async (id) => {
    const result = await pool.query(
      `SELECT id, firstName, lastName, username, email, role, created_at AS "createdAt"
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  // Update user
  update: async (id, fields) => {
    // Dynamically build SET part
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key} = $${i}`);
      values.push(fields[key]);
      i++;
    }

    values.push(id); // last value = user ID

    const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING id, firstName, lastName, username, email, role, created_at AS "createdAt"`;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all users (for admin)
  getAll: async () => {
    const result = await pool.query(
      `SELECT id, firstName, lastName, username, email, role, created_at AS "createdAt" FROM users ORDER BY created_at DESC`
    );
    return result.rows;
  }
};

module.exports = UserModel;

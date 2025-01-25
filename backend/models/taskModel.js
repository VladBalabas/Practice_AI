const pool = require('../config/db');

const getTasks = async () => {
  const res = await pool.query('SELECT * FROM tasks');
  return res.rows;
};

const addTask = async (task) => {
  const res = await pool.query('INSERT INTO tasks (name) VALUES ($1) RETURNING *', [task]);
  return res.rows[0];
};

const updateTask = async (id) => {
  const res = await pool.query('UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};

const deleteTask = async (id) => {
  const res = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
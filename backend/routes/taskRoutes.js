const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../models/taskModel');
const router = express.Router();

router.get('/tasks', async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

router.post('/tasks', async (req, res) => {
  const task = req.body.name;
  const newTask = await addTask(task);
  res.json(newTask);
});

router.patch('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const updatedTask = await updateTask(id);
  res.json(updatedTask);
});

router.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const deletedTask = await deleteTask(id);
  res.json(deletedTask);
});

module.exports = router;

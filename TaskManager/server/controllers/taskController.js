const Task = require('../models/task');
const { Op } = require('sequelize');

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({ where: { user_id: userId } });
    // Group by status
    const grouped = { 'To Do': [], 'In Progress': [], 'Done': [] };
    tasks.forEach(task => grouped[task.status].push(task));
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    const task = await Task.create({ title, user_id: userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findOne({ where: { id, user_id: userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

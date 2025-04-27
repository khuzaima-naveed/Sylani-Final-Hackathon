// const express = require('express');
// const Task = require('../models/Task');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// // Protect all routes
// router.use(authMiddleware);

// // Create Task
// router.post('/', async (req, res) => {
//   try {
//     const { title, status } = req.body;
//     const newTask = new Task({
//       user: req.userId,
//       title,
//       status: status || 'todo',
//     });
//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     console.error('Create task error:', err);
//     res.status(500).json({ message: 'Create task failed' });
//   }
// });

// // Get All Tasks for Logged In User
// router.get('/', async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.userId });
//     res.status(200).json(tasks);
//   } catch (err) {
//     console.error('Fetch tasks error:', err);
//     res.status(500).json({ message: 'Fetch tasks failed' });
//   }
// });

// // Update Task
// router.put('/:id', async (req, res) => {
//   try {
//     const { status, title } = req.body;
//     const updatedTask = await Task.findOneAndUpdate(
//       { _id: req.params.id, user: req.userId },
//       { status, title },
//       { new: true }
//     );
//     res.status(200).json(updatedTask);
//   } catch (err) {
//     console.error('Update task error:', err);
//     res.status(500).json({ message: 'Update task failed' });
//   }
// });

// // Delete Task
// router.delete('/:id', async (req, res) => {
//   try {
//     await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     console.error('Delete task error:', err);
//     res.status(500).json({ message: 'Delete task failed' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = new Task({ title, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;

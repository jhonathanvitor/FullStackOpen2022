const express = require('express');
const { createTask, getAllTask, getTask, deleteTask, updateTask } = require('../controllers/taskController');
const Task = require('../models/taskModel');
const router = express.Router();

router.get('/', getAllTask)
router.get('/:id', getTask)
router.post("/", createTask);
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

module.exports = router

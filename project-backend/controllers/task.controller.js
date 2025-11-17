const Task = require('../models/task.model');


const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline, assignedTo } = req.body;

    
    if (!title) {
      return res.status(400).json({ message: 'Task title is required.' });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      assignedTo: assignedTo || null, 
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};


const getAllTasks = async (req, res) => {
  try {
    
    const tasks = await Task.find({}).populate(
      'assignedTo',
      'firstName lastName email'
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};


const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'assignedTo',
      'firstName lastName email'
    );

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.priority = req.body.priority || task.priority;
      task.deadline = req.body.deadline || task.deadline;
      
      
      if (req.body.assignedTo !== undefined) {
        task.assignedTo = req.body.assignedTo;
      }

      const updatedTask = await task.save();

      
      const populatedTask = await Task.findById(updatedTask._id).populate(
        'assignedTo',
        'firstName lastName email'
      );

      res.status(200).json(populatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (task) {
      res.status(200).json({ message: 'Task removed successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};


const getTasksForEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.employeeId }).populate(
      'assignedTo',
      'firstName lastName email'
    );

    if (tasks) {
      res.status(200).json(tasks);
    } else {
      
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks for employee', error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksForEmployee,
};